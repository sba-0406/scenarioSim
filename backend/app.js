const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Load env vars from root directory
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to database
const connectDB = require('./config/db');
connectDB();

console.log('[SYSTEM INIT] Environment Variables Checked:');
console.log(` - GROQ_API_KEY: ${process.env.GROQ_API_KEY ? 'DETECTED' : 'MISSING'}`);
console.log(` - GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? 'DETECTED' : 'MISSING'}`);
console.log(` - PORT: ${process.env.PORT || 4000}`);

// Register Models
require('./models/User');
// require('./models/Rubric');
// require('./models/Scenario');
// require('./models/SimulationResponse');
require('./models/ChatSession');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Set static folder for public assets
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Route files
// const authRoutes = require('./routes/authRoutes');
// const scenarioRoutes = require('./routes/scenarioRoutes');
// const simulationRoutes = require('./routes/simulationRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const userRoutes = require('./routes/userRoutes');
// const aiGenerationRoutes = require('./routes/aiGenerationRoutes');
// const chatRoutes = require('./routes/chatRoutes');
const dojoRoutes = require('./routes/dojoRoutes');
const authRoutes = require('./routes/authRoutes');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/dojo', dojoRoutes);

// View Routes
app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

module.exports = app;
