import {ObjectID} from 'bson';

import {ParentI} from '../../core/models/ParentModel';
import {MongoDatabase} from '../../db/mongo/MongoDatabase';

export class MongoRepository {
  private mongoDatabase: MongoDatabase;

  constructor() {
    this.mongoDatabase = MongoDatabase.getInstance();
  }

  async createOne(obj: ParentI) {
    return await this.mongoDatabase.getDatabase()
        .collection('parents')
        .insertOne(Object.assign({}, obj));
  }

  async readOne(id: string) {
    return await this.mongoDatabase.getDatabase().collection('parents').findOne(
        {'_id': new ObjectID(id)});
  }

  async readAll() {
    return await this.mongoDatabase.getDatabase().collection('parents').find();
  }

  async updateOne(id: string, newValue: string) {
    return await this.mongoDatabase.getDatabase()
        .collection('parents')
        .updateOne({'_id': new ObjectID(id)}, {$set: {name: newValue}});
  }

  async deleteOne(id: string) {
    return await this.mongoDatabase.getDatabase()
        .collection('parents')
        .deleteOne({'_id': new ObjectID(id)});
  }
}
