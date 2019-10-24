const express = require('express');
const speakersRoute = require('./speakers.js');
const feedbackRoute = require('./feedback.js');

const router = express.Router();

module.exports = params => {
  const { speakerService } = params;

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  router.get('/', async (request, response) => {
    const speakerslist = await speakerService.getList();
    console.log(speakerslist);
    response.render('layout', {
      pageTitle: 'Welcome',
      template: 'index',
      showJumbotron: true,
      speakerslistTop: speakerslist,
    });
  });
  return router;
};
