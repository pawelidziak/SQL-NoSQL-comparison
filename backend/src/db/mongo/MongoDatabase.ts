import {Db, MongoClient} from 'mongodb';

import {ClearDatabaseErr, DatabaseConnectionErr} from '../../infrastructure/errors';
import {DatabaseModel} from '../DatabaseModel';

import {MONGODB_CONFIG} from './Mongodb.config';
import {MongoQueries} from './MongoQueries';

/**
 *  Class with ONLY con methods
 */
export class MongoDatabase implements DatabaseModel {
  private static instance: MongoDatabase;
  private _con: MongoClient | any;

  private readonly config = `mongodb://${MONGODB_CONFIG.host}:${
    MONGODB_CONFIG.port}/${MONGODB_CONFIG.db_name}`;

  private constructor() {
    this.connect()
      .then(() => console.log(`MongoDB CONNECTED.`))
      .catch(err => console.error(err));
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
  async connect(): Promise<any> {
    try {
      this._con =
        await MongoClient.connect(this.config, {useNewUrlParser: true});
      await this.initDb();
    } catch (e) {
      console.error(e);
      throw new DatabaseConnectionErr('MongoDB connection failed.');
    }
  }

  async initDb(): Promise<any> {
    await this.clearDB();
  }

  async clearDB(): Promise<any> {
    try {
      await this.exec().dropDatabase();
      await this.exec().createCollection(MongoQueries.PARENTS_TABLE);
      await this.exec().createCollection(MongoQueries.CHILDREN_TABLE);
      await this.exec().collection(MongoQueries.CHILDREN_TABLE).createIndex({name: 1});
    } catch (e) {
      console.error(e);
      throw new ClearDatabaseErr(`MongoDB clear database failed.`);
    }
  }

  exec(): Db {
    return this._con.db('mgrMongo', {returnNonCachedInstance: true});
  }
}
