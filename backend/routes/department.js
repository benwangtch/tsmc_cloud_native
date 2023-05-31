const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Document = require('../models/Document');

// @route  GET api/shared
// @desc   Get all documents
// @access Public

router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find({
      department: req.user.department,
    }).sort({
      date: -1,
    });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
