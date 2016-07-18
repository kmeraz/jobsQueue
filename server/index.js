import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './router.js';
import mongoose from 'mongoose';

import worker from './workers/worker.js';

const mongoDB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mydb';

mongoose.connect(mongoDB_URI);

const app = express();
const port = process.env.PORT || 8080;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../client/`));

router(app, express);

app.listen(port, () => {
  console.log('Massdrop server listening on port:', port);
});
