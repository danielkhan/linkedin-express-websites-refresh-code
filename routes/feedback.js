const express = require('express');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

module.exports = params => {
  const { feedbackService } = params;
  router.get('/', async (request, response) => {
    const feedback = await feedbackService.getList();
    console.log(feedback);
    response.render('layout', {
      pageTitle: 'Feedback',
      template: 'feedback',
      showJumbotron: true,
      error: request.query.error,
      feedback,
    });
  });

  router.post(
    '/',
    [
      check('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage('A name required'),
      check('title')
        .trim()
        .isLength({ min: 1 })
        .withMessage('A title is required'),
      check('message')
        .trim()
        .isLength({ min: 5 })
        .withMessage('A message is required'),
    ],

    async (request, response) => {
      const feedbackName = request.body.name.trim();
      const feedbackTitle = request.body.title.trim();
      const feedbackMessage = request.body.message.trim();

      if (!feedbackName || !feedbackTitle || !feedbackMessage) {
        return response.redirect('/feedback?error=true');
      }
      return response.send('Post Feedback');
    }
  );
  return router;
};
