export default (app, express) => {
  console.log(app, express);

  app.get('/dude', (req, res) => {
    res.send('cool brah');
  });
};
