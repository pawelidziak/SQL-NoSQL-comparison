import {Db, MongoClient} from 'mongodb';
import {DatabaseModel} from '../DatabaseModel';

/**
 *  Class with ONLY connection methods
 */
export class MongoDatabase implements DatabaseModel {
  private readonly DB_URL = 'mongodb://localhost:27017/mgrMongo';
  private _database: MongoClient|null;

  constructor() {
    this._database = null;
    this.connect();
  }


  /**
   *    DATABASE METHODS
   */
  connect(): void {
    if (!this._database) {
      MongoClient.connect(this.DB_URL, {useNewUrlParser: true}, (err, db) => {
        if (err) throw err;
        this._database = db;
        console.log('Mongo connected: ' + this.isConnected());
        db.db().createCollection('testCol').then(
            () => console.log('testCol created \n\n'));
      });
    }
  }

  isConnected(): boolean {
    return this._database ? this._database.isConnected() : false;
  }

  disconnect(): void {
    if (this._database) {
      this._database.close(true);
    }
  }

  getDatabase(): Db {
    // @ts-ignore
    return this._database.db();
  }
}
