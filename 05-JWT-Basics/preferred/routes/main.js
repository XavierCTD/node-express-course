const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const { logon, hello } = require('../controllers/main');


router.post('/logon', logon);
router.get('/hello', authMiddleware, hello);

module.exports = router;