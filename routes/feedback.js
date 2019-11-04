const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = params => {
  const { feedbackService } = params;

  const validations = [
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
  ];

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

  router.post('/', validations, async (request, response, next) => {
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
  });

  router.post('/api', validations, async (request, response) => {
    // let's check the validationresult
    const errors = validationResult(request);

    // if there are errors ..
    if (!errors.isEmpty()) {
      // We will just return a JSON object containing all errors using response.json
      return response.json({ errors: errors.array() });
    }

    const { name, email, title, message } = request.body;
    // if there were no errors, we will store the data as we did with the form as well
    await feedbackService.addEntry(name, email, title, message);

    // so we fetch the data
    const feedback = await feedbackService.getList();

    // and return it
    return response.json({ feedback });
  });

  return router;
};
