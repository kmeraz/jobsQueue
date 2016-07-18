import redisClient from '../db/redis.js';

export const getNewJobID = () => {
  return new Promise((resolve, reject) => {
    redisClient.incr('jobCount', (err, reply) => {
      if (err) {
        console.log('this is err', err);
        reject(err);
      } else {
        console.log('this is reply', reply);
        resolve(reply);
      }
    });
  });
};

export const addNewJob = (id, url) => {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ id: id, url: url });
    redisClient.rpush('jobsQueue', [payload], (err, reply) => {
      if (err) {
        reject(err);
      } else {
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
