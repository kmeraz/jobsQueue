import * as db from './controllers/db.js';
import * as jobsQueue from './controllers/jobsQueue.js';
// we take in the app and express objects and provide
// the framework for the routing of the app

import worker from './workers/worker.js';

export default (app, express) => {

  // when a user makes a post request to '/links'
  // we accept the url and return a job id
  app.get('/links', (req, res) => {
    const url = req.query.url;

  });

  app.post('/links', (req, res) => {
    const url = req.query.url;
    let jobID;

    // First, we access our jobs queue (redis)
    // for the new Job ID

    jobsQueue.getNewJobID()
    .then((id) => {
      jobID = id;
    })
    .catch((err) => {
      console.log('Error. Please try again in a few moments', err);
    })
    .then(() => {
      
      // Then we store the domain name into MongoDB, along
      // with a status of 'pending'

      db.storeDomainName(jobID, url)
      .then((data) => {
        console.log('this is data afer storing to mongo', data);
      })
      .catch((err) => {
        console.log('this is error', err);
      });
    })
    .catch((err) => {
      console.log('error', err);
      res.sendStatus(404);
    })
    .then(() => {

      // Now, we add the job to the job queue.
      // The job consists of aa jobID and a URL

      jobsQueue.addNewJob(jobID, url)
      .then(() => {
        res.send('Check back in a few moments with your job ID: ' + jobID);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
    })
    .catch((err) => {
      console.log('this is err', err);
    });
  });
};
