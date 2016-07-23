import * as db from './db.js';
import * as jobsQueue from './jobsQueue.js';

import { isInt, isURL } from 'validator';

export default (req, res) => {
  const url = req.query.url;
  let jobID;
  if (isInt(url) || !isURL(url)) {
    res.status(404).send('Sorry, what you entered is not a valid URL. Please, try again.');
  } else {
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
  }
};
