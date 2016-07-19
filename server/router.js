import * as db from './controllers/db.js';
import * as jobsQueue from './controllers/jobsQueue.js';
import isInt from 'validator/lib/isInt';
// we take in the app and express objects and provide
// the framework for the routing of the app

import worker from './workers/worker.js';

export default (app, express) => {

  // when a user makes a post request to '/links'
  // we accept the url and return a job id
  app.get('/links', (req, res) => {
    const jobID = req.query.jobID;
  
    // Form validation. We want to make sure that the user inputs a number
    // as the job ID. If not, then we kindly remind them.
    if (!isInt(jobID)) {
      res.send('Please make sure to enter a number as your job ID. Thanks!');
    } else {
      // Great! The user has entered a number as the jobID. Now, we
      // can proceed as planned.

      db.retrieveHTML(JSON.parse(jobID))
      .then((result) => {
        if (result.status === 'pending') {
          res.send('Your job is pending. Please check back in a few moments.');
        } else if (result.status === 'finished') {
          res.send(result.html);
        } else {
          res.send('A job with that ID does not exist. Please double check your job ID and try again.');
        }
      })
      .catch((err) => {
        res.status(500).send('Ouch! Our server needs a second. Try again soon.');
      });
    }
  });

  app.post('/links', (req, res) => {

    const url = req.query.url;
    let jobID;

    // First, we check to see if the url and html has
    // previously been stored. If so, then we check
    // its status or send the completed job's ID.

    db.isUrlAlreadyStored(url)
    .then((result) => {
      // If the URL has a status of pending, then let the user know that
      // the job is currently in progress and give them the job ID to check
      // back with.

      if (result.status === 'pending') {
        res.send(`Another job with the same url of ${result.url} is currently being processed. Please check back in a few moments with jobID ` + result.jobID + ` for your HTML.`);

      } else if (result.status === 'finished') {
        // the job has previously been processed
        // and we already have the HTML for the user.
        res.send(`Lucky you! This URL has already been processed. Enter the jobID: ${result.jobID} to retrieve the HTML`);
      } else {

        // Else, we will add the job to the jobsQueue
        // for our worker to take care of.

        // We create a new jobID for the latest job

        jobsQueue.getNewJobID()
        .then((id) => {
          jobID = id;
        })
        .catch((err) => {
          res.sendStatus(504);
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
      }
    })
    .catch((err) => {
      res.sendStatus(500);
    });

  });
};
