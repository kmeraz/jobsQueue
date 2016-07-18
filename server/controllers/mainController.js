import Url from '../models/Url.js';

export const storeDomainName = (url) => {
  Url.create({
    url: url,
    status: 'pending',
    html: '',
  }, (err, data) => {
    if (err) {
      console.log('Error! We were unable to add your url to the db', err);
      return err;
    } else {
      console.log('Success! Url created and added to the db', data);
      return data;
    }
  });
};

export const addHtml = (id, html) => {
  Url.findOneAndUpdate(id, {
    html: html,
  }, (err, data) => {
    if (err) {
      console.log('Error! We were unable to add the html to the record', err);
      return err;
    } else {
      console.log('Success! The HTML was added to the url\'s record', data);
      return data;
    }
  });
};

export const retrieveHTML = (id) => {
  Url.findById(id, (err, data) => {
    if (err) {
      console.log('Error! We were unable to retrieve the HTML for job', 1);
      return err;
    } else {
      console.log('Success! Here is the HTML for the job', data);
      return data;
    }
  });
};
