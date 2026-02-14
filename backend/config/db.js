const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scenario_platform';
    console.log('Connecting to DB...');
    console.log('URI used:', dbUri.substring(0, 20) + '...');

    const conn = await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DB ERROR] Connection Failed: ${error.message}`);
    if (error.message.includes('SSL') || error.message.includes('tlsv1')) {
      console.warn('--- TROUBLESHOOTING TIP ---');
      console.warn('This SSL/TLS error usually means your IP is not whitelisted in MongoDB Atlas.');
      console.warn('1. Log into MongoDB Atlas Dashboard.');
      console.warn('2. Go to "Network Access" -> Edit "0.0.0.0/0" or add your current IP.');
      console.warn('--------------------------');
    }
    // Don't exit process in all cases, let the server potentially run and retry if needed
    // process.exit(1); 
  }
};

module.exports = connectDB;
