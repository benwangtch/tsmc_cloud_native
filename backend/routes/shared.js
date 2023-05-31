const express = require('express');
const router = express.Router();

const Document = require('../models/Document');

// @route  GET api/shared
// @desc   Get all documents
// @access Public

router.get('/', async (req, res) => {
  try {
    const documents = await Document.find({ type: 'shared' }).sort({
      date: -1,
    });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
