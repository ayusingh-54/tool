// filepath: /c:/Users/uditv/OneDrive/Desktop/iaehi/backend/routes/admin.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// Authenticate admin
router.post('/login', async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
