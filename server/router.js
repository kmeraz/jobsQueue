import * as mainController from './controllers/mainController.js';
import * as jobsQueue from './controllers/jobsQueue.js';
// we take in the app and express objects and provide
// the framework for the routing of the app
/// for testing
import worker from './workers/worker.js';

// testing^^&
export default (app, express) => {

  // when a user makes a post request to '/links'
  // we accept the url and return a job id
  app.get('/links', (req, res) => {
    const url = req.query.url;
    const result = worker();
    console.log('from get request', result);

  });

  app.post('/links', (req, res) => {
    const url = req.query.url;

    jobsQueue.getNewJobID()
    .then((id) => {
      jobsQueue.addNewJob(id, url)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log('this is err', err);
      });
    })
    .catch((err) => {
      console.log('Error. Please try again in a few moments', err);
    });
  });
};
