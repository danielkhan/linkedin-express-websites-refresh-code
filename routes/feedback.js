const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.send('Feedback');
  });

  router.post('/', (req, res) => {
    res.send('Post Feedback');
  });
  return router;
};
