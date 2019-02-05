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
        console.log('MongoDB connected.');
      });
    }
  }

  isConnected(): boolean {
    if (!this.database) {
      return false;
    }
    return !!this.database;
  }

  disconnect(): void {
    // @ts-ignore
    this.database.close(true);
  }
}
