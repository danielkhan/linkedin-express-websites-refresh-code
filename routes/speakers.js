const express = require('express');

const router = express.Router();

module.exports = params => {
  const { speakersService } = params;

  router.get('/', (request, response) => {
    response.send('Speakers List');
  });

  router.get('/:speakername', (request, response) => {
    response.send(`Detail page of ${request.params.speakername}`);
  });
  return router;
};
