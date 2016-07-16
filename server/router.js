
// we take in the app and express objects and provide
// the framework for the routing of the app
export default (app, express) => {

  // when a user makes a post request to '/links'
  // we accept the url and return a job id
  app.get('/links', (req, res) => {
    console.log(req.query.url);
    res.send(req.query.url);
  });
};
