import redisClient from '../db/redis.js';

export const getNewJobID = () => {
  return new Promise((resolve, reject) => {
    redisClient.incr('jobCount', (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
};

export const addNewJob = (id, url) => {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ id: id, url: url });
    console.log('this is payload within addNewJob', payload);
    redisClient.rpush('jobsQueue', [payload], (err, reply) => {
      if (err) {
        reject(err);
      } else {
        console.log('this is reply within addNewJob', reply);
        resolve(JSON.parse(reply));
      }
    });
  });
};

export const grabJob = () => {
  return new Promise((resolve, reject) => {
    redisClient.lpop('jobsQueue', (err, reply) => {
      if (err) {
        console.log('thisiserr', err);
        reject(err);
      } else {
        resolve(JSON.parse(reply));
      }
    });
  });
};
