const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const History = require('../models/History');

// @route  GET api/histories
// @desc   Get all history
// @access Private

router.get('/:documentId', async (req, res) => {
  try {
    const documentId = req.params.documentId;

    const histories = await History.find({ documentId }).sort({
      date: -1,
    });
    res.json(histories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/histories
// @desc   Add new history
// @access Private

router.post('/', auth, async (req, res) => {
  try {
    const { documentId, title, content, operation } = req.body;

    const newHistory = new History({
      documentId,
      title,
      content,
      operation,
      userId: req.user.id,
      userName: req.user.name,
    });

    const validationError = newHistory.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    const history = await newHistory.save();
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
