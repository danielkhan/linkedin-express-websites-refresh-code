const express = require('express');
const speakersRoute = require('./speakers.js');
const feedbackRoute = require('./feedback.js');

const router = express.Router();

module.exports = () => {
  router.use('/speakers', speakersRoute());
  router.use('/feedback', feedbackRoute());

  router.get('/', (req, res) => {
    res.render('pages/index', { pageTitle: 'Welcome' });
  });
  return router;
};
