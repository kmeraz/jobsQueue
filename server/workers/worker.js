import { CronJob } from 'cron';
import request from 'request';
import * as db from '../controllers/mainController.js';
import * as jobsQueue from '../controllers/jobsQueue.js';

export default new CronJob('* * * * * *', () => {
  // console.log('You will see this message every second');
  let job;

  jobsQueue.grabJob()
  .then((reply) => {
    job = reply;
    console.log('this is job', reply);
  })
  .catch((err) => {
    console.log('error', err);
  });

  if (job) {
    request.get('http://' + job + "'", (error, response, body) => {
      if (error) {
        console.log('error', error);
      } else {
        // console.log('this is response', response);
        console.log('this is body', body);
        // db.addHTML
      }
    });
  }

}, null, true, 'America/Los_Angeles');
