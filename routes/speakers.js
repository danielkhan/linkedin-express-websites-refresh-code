const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.send('Speakers List');
  });

  router.get('/:speakername', (req, res) => {
    res.send(`Detail page of ${req.params.speakername}`);
  });
  return router;
};
