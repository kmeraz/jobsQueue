import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './router.js';

const app = express();
const port = process.env.PORT || 8080;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../client/`));


router(app, express);

app.listen(port, () => {
  console.log('Massdrop server listening on port:', port);
});
