import Url from '../models/Url.js';

export const storeUrl = (jobID, url) => {
  return new Promise((resolve, reject) => {
    Url.create({
      jobID: jobID,
      url: url,
      status: 'pending',
      html: '',
  }, (err, data) => {
    if (err) {
      console.log('Error! We were unable to add your url to the db', err);
      reject(err);
    } else {
      console.log('Success! Url created and added to the db', data);
      resolve(data);
    }
    });
  });
};


export const addHTML = (jobID, html) => {
  return new Promise((resolve, reject) => {
    Url.findOneAndUpdate({
      jobID: jobID,
      },
      {
      html: html,
      status: 'finished',
    }, (err, data) => {
      if (err) {
        // console.log('Error! We were unable to add the html to the record', err);
        reject(err);
      } else {
        // console.log('Success! The HTML was added to the url\'s record', data);
        resolve(data);
      }
    });
  });
};

export const retrieveHTML = (jobID) => {
  return new Promise((resolve, reject) => {
    Url.find({
      jobID: jobID,
    }, (err, data) => {
      if (err) {
        console.log('Error! We were unable to retrieve the HTML for job', id);
        reject(err);
      } else {
        data.length === 0 ? resolve(false) : resolve(data[0]);
      }
    });
  });
};

export const isUrlAlreadyStored = (url) => {
  return new Promise((resolve, reject) => {
    Url.find({
      url: url,
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        data.length === 0 ? resolve(false) : resolve(data[0]);
      }
    }
    );
  });
};