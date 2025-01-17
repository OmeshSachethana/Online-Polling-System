const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

// Create a new poll
router.post('/create', async (req, res) => {
  try {
    const { question, options } = req.body;
    const poll = new Poll({
      question,
      options,
      votes: new Array(options.length).fill(0), // Initialize vote counts
    });

    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all polls
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vote on a poll
router.post('/vote/:pollId', async (req, res) => {
  try {
    const { pollId } = req.params;
    const { optionIndex } = req.body;

    const poll = await Poll.findById(pollId);

    if (!poll || !poll.isActive) return res.status(404).json({ message: 'Poll not found or closed' });

    // Update the vote count
    poll.votes[optionIndex]++;
    await poll.save();

    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
