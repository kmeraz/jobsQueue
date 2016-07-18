import request from 'request';
import * as db from '../controllers/db.js';
import * as jobsQueue from '../controllers/jobsQueue.js';
import Url from '../models/Url.js';

export default setInterval(() => {
  let job;

  jobsQueue.grabJob()
  .then((reply) => {
    if (reply) {
      request.get('http://' + reply.url + "'", (error, response, body) => {
        if (error) {
          console.log('error', error);
        } else {
          // db.


        }
      });
    }
  })
  .catch((err) => {
    console.log('error', err);
  });
}, 5000);
