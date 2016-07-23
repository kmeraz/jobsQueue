import * as db from './db.js';

import { isInt } from 'validator';

/* When a user submits a job ID to /links,
    if their job has finished, then we return
    the HTML associated with the job. If not,
    then we simply request that they check
    back in a few moments.
  */

export default (req, res) => {
  const jobID = req.query.jobID;

  // Form validation. We want to make sure that the user inputs a number
  // as the job ID. If not, then we kindly remind them.
  if (!isInt(jobID)) {
    res.send('Please make sure to enter a number as your job ID. Thanks!');
  } else {
    /*
    Great! The user has entered a number as the jobID. Now, we
    can proceed as planned and check whether the job has finished.
    */

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
};
