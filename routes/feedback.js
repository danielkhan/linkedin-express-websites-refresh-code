const express = require('express');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

module.exports = params => {
  const { feedbackService } = params;

  router.get('/', async (request, response) => {
    const feedback = await feedbackService.getList();
    const errors = request.session.feedback ? request.session.feedback.errors : false;
    const successMessage = request.session.feedback ? request.session.feedback.message : false;
    request.session.feedback = {};
    return response.render('layout', {
      pageTitle: 'Feedback',
      template: 'feedback',
      showJumbotron: true,
      errors,
      successMessage,
      feedback,
    });
  });

  router.post(
    '/',
    [
      check('name')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('A name required')
        .escape(),
      check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('A valid email address required')
        .escape(),
      check('title')
        .trim()
        .isLength({ min: 3 })
        .withMessage('A title is required')
        .escape(),
      check('message')
        .trim()
        .isLength({ min: 5 })
        .withMessage('A message is required')
        .escape(),
    ],
    async (request, response, next) => {
      try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
          request.session.feedback = {
            errors: errors.array(),
          };
          return response.redirect('/feedback');
        }

        const { name, email, title, message } = request.body;
        await feedbackService.addEntry(name, email, title, message);
        request.session.feedback = {
          message: 'Thank you for your feedback!',
        };
        return response.redirect('/feedback');
      } catch (err) {
        return next(err);
      }
    }
  );
  return router;
};
