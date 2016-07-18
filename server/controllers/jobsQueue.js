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
    redisClient.rpush('jobsQueue', [{ id: id, url: url }], (err, reply) => {
      if (err) {
        console.log('err within jerbsqueuadd', err);
        reject(err);
      } else {
        console.log('this is data withinjerquesadd', reply);
        resolve(reply);
      }
    });
  });
};

export const grabJob = () => {
  return new Promise((resole, reject) => {
    redisClient.lpop('jobsQueue', (err, reply) => {
      if (err) {
        console.log('thisiserr', err);
        reject(err);
      } else {
        console.log('this is reply', reply);
        resolve(reply);
      };
    });
  });
}