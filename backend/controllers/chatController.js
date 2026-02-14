const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        // Set token from cookie
        token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
        // If API, json. If view request, maybe redirect? 
        // For now assuming API response mostly, but if we render views we handle redirection in frontend/view controller
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, error: 'User no longer exists' });
        }
        req.user = user;

        // Authorization logic:
        // - Admins always have access
        // - Employees and managers have default access (unless explicitly deactivated)
        // - Only block if isActive is false or isAuthorized is explicitly false
        if (req.user.role === 'admin') {
            // Admins always pass
            return next();
        }

        // For employees and managers: check if they're active
        if (!req.user.isActive) {
            return res.status(403).json({ success: false, error: 'Account has been deactivated' });
        }

        // If isAuthorized is explicitly set to false, block them
        if (req.user.isAuthorized === false) {
            return res.status(403).json({ success: false, error: 'Awaiting admin authorization' });
        }

        // Otherwise, allow access (default for employee/manager)
        next();
    } catch (err) {
        console.error('Auth Error:', err);
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }
};
