import getRequest from './controllers/getRequest.js';
import postRequest from './controllers/postRequest.js';

// we take in the app and express objects and provide
// the framework for the routing of the app

export default (app, express) => {

  app.route('/links')
    .get(getRequest)

    .post(postRequest);
};
