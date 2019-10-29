const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const routes = require('./routes');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.sitename = 'ROUX Academy';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames();
    // Just for debugging purposes
    res.locals.speakerNames = names;

    // Don't forget to call next
    return next();
  } catch (err) {
    return next(err);
  }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  routes({
    feedbackService,
    speakerService,
  })
);

app.listen(port, () => console.log(`Express server listening on port ${port}!`));
