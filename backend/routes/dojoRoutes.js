const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const dojoController = require('../controllers/dojoController');

// All dojo routes are protected
router.use(protect);

// API Routes
router.post('/start', dojoController.startDojoSession);
router.post('/respond', dojoController.respondToScenario);
router.post('/next', dojoController.nextScenario);
router.post('/finalize', dojoController.finalizeDojoSession);
router.get('/session/:id', dojoController.getDojoSession);

// View Routes (render pages)
router.get('/roles', dojoController.renderRolesPage);
router.get('/reports', dojoController.renderReportsPage);

router.get('/simulation/:sessionId', async (req, res) => {
  res.render('dojo-simulation', {
    user: req.user,
    sessionId: req.params.sessionId
  });
});

module.exports = router;
