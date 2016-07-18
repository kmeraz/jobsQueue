import request from 'request';
import * as db from '../controllers/mainController.js';
import * as jobsQueue from '../controllers/jobsQueue.js';



export default setInterval(() => {
  let job;

  jobsQueue.grabJob()
  .then((reply) => {
    if (reply) {
      request.get('http://' + reply.url + "'", (error, response, body) => {
        if (error) {
          console.log('error', error);
        } else {
          
        }
      });
    }
  })
  .catch((err) => {
    console.log('error', err);
  });

  
}, 5000);
