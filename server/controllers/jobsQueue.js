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
  console.log('this is id', id, 'tih is url', url);
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ id: id, url: url });
    console.log('this is payload', payload);
    redisClient.rpush('jobsQueue', [payload], (err, reply) => {
      if (err) {
        console.log('err within jerbsqueuadd', err);
        reject(err);
      } else {
        console.log('this is data withinjerquesadd', JSON.parse(reply));
        resolve(reply);
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
        console.log('this is reply in grabJob', reply);
        resolve(reply);
      }
    });
  });
};
