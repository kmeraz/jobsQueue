import * as mainController from './controllers/mainController.js';
import * as jobsQueue from './controllers/jobsQueue.js';
// we take in the app and express objects and provide
// the framework for the routing of the app
export default (app, express) => {

  // when a user makes a post request to '/links'
  // we accept the url and return a job id
  app.get('/links', (req, res) => {
    const url = req.query.url;
  });

  app.post('/links', (req, res) => {
    const url = req.query.url;
    let jobID;
    jobsQueue.getNewJobID()
    .then((id) => {
      jobID = id;
    })
    .catch((err) => {
      console.log('Error. Please try again in a few moments', err);
    });

    jobsQueue.addNewJob(url, jobID)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log('this is err', err);
    });
  });
};
