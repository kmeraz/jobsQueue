import request from 'request';
import * as db from '../controllers/db.js';
import * as jobsQueue from '../controllers/jobsQueue.js';

// export default setInterval(() => {

//   jobsQueue.grabJob()
//   .then((job) => {
//     if (job) {
//       request.get('http://' + job.url + "'", (error, response, body) => {
//         if (error) {
//           console.log('error', error);
//         } else {
//           db.addHTML(job.id, body)
//           .then((data) => {
//             console.log('data');
//           });
//         }
//       });
//     }
//   })
//   .catch((err) => {
//     console.log('error', err);
//   });
// }, 5000);
