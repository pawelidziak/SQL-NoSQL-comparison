import {DataModel} from '../../core/models/DataModel';
import {MongoDatabase} from '../../db/mongo/MongoDatabase';

export class MongoRepository {
  private mongoDatabase: MongoDatabase;

  constructor() {
    this.mongoDatabase = new MongoDatabase();
  }

  createOne(obj: DataModel) {
    return this.mongoDatabase
      .getDatabase()
      .collection('testCol')
      .insertOne(obj);
  }
}
