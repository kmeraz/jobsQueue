import * as db from './controllers/db.js';
import * as jobsQueue from './controllers/jobsQueue.js';
// we take in the app and express objects and provide
// the framework for the routing of the app

import worker from './workers/worker.js';

export default (app, express) => {

  // when a user makes a post request to '/links'
  // we accept the url and return a job id
  app.get('/links', (req, res) => {
    const jobID = req.query.jobID;

    db.retrieveHTML(jobID)
    .then((result) => {
      console.log('this is result', result);
      if (result.status === 'pending') {
        res.send('Your job is pending. Please check back in a few moments');
      } else if (result.status === 'finished') {
        console.log('this is html', result.html);
        res.send(result.html);
      } else {
        res.send('A job with that ID does not exist. Please check your job ID and try again.');
      }
    })
    .catch((err) => {
      res.send('A job with that ID does not exist.');
    });
  });

  app.post('/links', (req, res) => {

    const url = req.query.url;
    let jobID;

    // First, we check to see if the url and html has
    // previously been stored. If so, then we check
    // its status or send the completed job's ID.

    db.isUrlAlreadyStored(url)
    .then((result) => {

      // if the result is of length 0,
      // then that means the url + html
      // are not already in our db
      console.log('this is result from isUrlAlreadyStored.length', result.length);

      if (result.length === 0) {
        // We will add the job to the jobsQueue
        // for our worker to take care of.

        // We create a new jobID for the latest job

        jobsQueue.getNewJobID()
        .then((id) => {
          console.log('this is job id', id);
          jobID = id;
        })
        .catch((err) => {
          console.log('Error. Please try again in a few moments', err);
        })
        .then(() => {
          // Then we store the domain name into MongoDB, along
          // with a status of 'pending'

          db.storeUrl(jobID, url)
          .then(() => {

            // If storing the URL to our db is successful,
            // then we add the new job to the jobs queue.
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
            console.log('There was an error storing the URL to the database.', err);
          });
        })
        .catch((err) => {
          console.log('error', err);
          res.sendStatus(404);
        });
      } else if (result.status === 'pending') {

        // If the URL has a status of pending, then let the user know that
        // the job is currently in progress and give them the job ID to check
        // back with.

        res.send('Another job with the same url is currently being processed. Please check back in a few moments with jobID' + result.jobID);
      } else {
        // Else, the job has previously been processed
        // and we already have the HTML for the user.

        res.send('Your job has previously been processed. Enter this jobID to retrieve the HTML:' + result.jobID);
      }
    });


  });
};
