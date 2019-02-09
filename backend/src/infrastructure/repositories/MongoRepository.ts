import {ObjectID} from 'bson';

import {DataModel} from '../../core/models/DataModel';
import {MongoDatabase} from '../../db/mongo/MongoDatabase';

export class MongoRepository {
  private mongoDatabase: MongoDatabase;

  constructor() {
    this.mongoDatabase = MongoDatabase.getInstance();
  }

  createOne(obj: DataModel) {
    return this.mongoDatabase.getDatabase()
        .collection('simpleData')
        .insertOne(obj);
  }

  readOne(id: string) {
    return this.mongoDatabase.getDatabase().collection('simpleData').findOne({
      '_id': new ObjectID(id)
    });
  }

  updateOne(id: string, newValue: string) {
    return this.mongoDatabase.getDatabase()
        .collection('simpleData')
        .updateOne({'_id': new ObjectID(id)}, {$set: {'name': newValue}});
  }

  deleteOne(id: string) {
    return this.mongoDatabase.getDatabase()
        .collection('simpleData')
        .deleteOne(
            {'_id': new ObjectID(id)},
        );
  }
}
