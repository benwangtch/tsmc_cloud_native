const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Document = require('../models/Document');

// @route  GET api/documents
// @desc   Get all users documents
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/documents/:id
// @desc   Get the document
// @access Private
router.get('/:id', async (req, res) => {
  let document = await Document.findById(req.params.id);
  if (!document) return res.status(404).json({ msg: 'Document not found' });
  res.json({
    title: document.title,
    content: document.content,
    department: document.department,
    userName: document.userName,
    user: document.user,
    date: document.date,
  });
});

// @route  POST api/documents/
// @desc   Add new document
// @access Private

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').notEmpty(),
      check('content', 'Content is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, type } = req.body;

    try {
      const newDocument = new Document({
        title,
        content,
        type,
        user: req.user.id,
        department: req.user.department,
        userName: req.user.name,
      });

      const document = await newDocument.save();
      res.json({ _id: document._id });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  PUT api/documents/:id
// @desc   Update document
// @access Private

router.put('/:id', auth, async (req, res) => {
  const { title, content, type } = req.body;

  // Build contact object
  const documentFields = {};
  if (title) documentFields.title = title;
  if (content) documentFields.content = content;
  if (type) documentFields.type = type;

  try {
    let document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ msg: 'Document not found' });

    // Make sure user owns contact
    if (document.department !== req.user.department) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    document = await Document.findByIdAndUpdate(
      req.params.id,
      { $set: documentFields },
      { new: true }
    );

    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/documents/:id
// @desc   Delete document
// @access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ msg: 'Document not found' });

    // Make sure user owns contact
    if (document.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Document.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Document removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/documents/:id/edit
// @desc   Get the document for editing
// @access Private
router.get('/:id/edit', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    // Make sure user owns the document
    if (document.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json({
      title: document.title,
      content: document.content,
      type: document.type,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
