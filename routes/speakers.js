const express = require('express');

const router = express.Router();

module.exports = params => {
  const { speakerService } = params;

  router.get('/', async (request, response) => {
    const speakerlist = await speakerService.getList();

    response.render('layout', {
      pageTitle: 'Our speakers',
      template: 'speakers',
      speakerlist,
    });
  });

  router.get('/:shortname', async (request, response) => {
    const speaker = await speakerService.getSpeaker(request.params.shortname);
    console.log(speaker);
    response.render('layout', {
      pageTitle: speaker.name,
      template: 'speaker-detail',
      speaker,
    });
  });
  return router;
};
