const express = require('express');
const speakersRoute = require('./speakers.js');
const feedbackRoute = require('./feedback.js');

const router = express.Router();

module.exports = params => {
  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  router.get('/', (request, response) => {
    response.render('layout', {
      pageTitle: 'Welcome',
      template: 'index',
      showJumbotron: true,
      showSpeakerslist: true,
    });
  });
  return router;
};
