const express = require('express');
const router = express.Router();
const { User } = require('../models');


router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;