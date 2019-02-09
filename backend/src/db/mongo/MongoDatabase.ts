import {Db, MongoClient} from 'mongodb';

/**
 *  Class with ONLY connection methods
 */
export class MongoDatabase {
  private static instance: MongoDatabase;

  private readonly DB_URL = 'mongodb://localhost:27017/mgrMongo';
  private _database: MongoClient | null;

  private constructor() {
    this._database = null;
    this.connect();
  }

  static getInstance() {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }
    return MongoDatabase.instance;
  }

  /**
   *    DATABASE METHODS
   */
  connect(): void {
    if (!this._database) {
      MongoClient.connect(this.DB_URL, {useNewUrlParser: true}, (err, db) => {
        if (err) throw err;
        this._database = db;
        db.db().dropDatabase();
        db.db().createCollection('simpleData');
        db.db().createCollection('extendData');
      });
    }
  }

  getDatabase(): Db {
    // @ts-ignore
    return this._database.db();
  }
}
