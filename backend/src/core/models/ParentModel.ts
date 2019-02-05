import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const parentModel = new Schema({
  firstName: {type: String, required: 'Enter a first name'},
  lastName: {type: String, required: 'Enter a first name'},
  email: {type: String},
  created_date: {type: Date, default: Date.now}
});

export interface ParentModel {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  childIds: string[];
}