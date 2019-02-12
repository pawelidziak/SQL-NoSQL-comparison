import {Db, MongoClient} from 'mongodb';
import {DatabaseConnectionErr} from '../../infrastructure/errors/DatabaseConnectionErr';
import {MONGODB_CONFIG} from './Mongodb.config';

/**
 *  Class with ONLY con methods
 */
export class MongoDatabase {
  private static instance: MongoDatabase;

  private readonly DB_URL = `mongodb://${MONGODB_CONFIG.host}:${
      MONGODB_CONFIG.port}/${MONGODB_CONFIG.db_name}`;
  private _database: MongoClient|null;
  readonly PARENTS_COL = 'parents';

  private constructor() {
    this._database = null;
    this.connect();
  }

  static getInstance(): MongoDatabase {
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
        if (err) throw new DatabaseConnectionErr('MongoDB connection failed.');
        this._database = db;
        console.log('Mongo CONNECTED');
        db.db().dropDatabase().then(() => {
          db.db().createCollection(this.PARENTS_COL);
        });
      });
    }
  }

  getDatabase(): Db {
    // @ts-ignore
    return this._database.db();
  }
}
