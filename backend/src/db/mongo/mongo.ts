import {MongoClient} from 'mongodb';
import {DatabaseModel} from '../DatabaseModel';

export class Mongo implements DatabaseModel {
  private readonly DB_URL = 'mongodb://localhost:27017/mgrMongo';
  private database: MongoClient|null;

  constructor() {
    this.database = null;
    this.connect();
  }

  connect(): void {
    if (!this.database) {
      MongoClient.connect(this.DB_URL, {useNewUrlParser: true}, (err, db) => {
        if (err) throw err;
        this.database = db;
      });
    }
  }

  isConnected(): boolean {
    return this.database ? this.database.isConnected() : false;
  }

  disconnect(): void {
    if (this.database) {
      this.database.close(true);
    }
  }
}
