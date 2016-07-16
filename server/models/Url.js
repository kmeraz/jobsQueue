import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: String,
  status: String,
  html: String,
});

export default mongoose.model('Url', urlSchema);
