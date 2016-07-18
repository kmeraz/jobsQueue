import { CronJob } from 'cron';
import jobsQueue from './jobsQueue.js';

import request from 'request';

export default new CronJob('* * * * * *', () => {
  // console.log('You will see this message every second');
  const url = jobsQueue.shift();

  if (url) {
    request.get(url, (error, response, body) => {
      if (error) {
        console.log('error', err);
      } else {
        // console.log('this is response', response);
        console.log('this is body', body);
      }
    });
  }

}, null, true, 'America/Los_Angeles');

