import { CronJob } from 'cron';
import jobsQueue from './jobsQueue.js';

import request from 'request';
import * as db from '../controllers/mainController.js';

export default new CronJob('* * * * * *', () => {
  // console.log('You will see this message every second');
  const url = jobsQueue.shift();

  if (url) {
    request.get('http://' + url + "'", (error, response, body) => {
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
