import * as pgPromise from 'pg-promise';
import {IDatabase, IMain} from 'pg-promise';

import {ClearDatabaseErr, DatabaseConnectionErr} from '../../infrastructure/errors';
import {DatabaseModel} from '../DatabaseModel';

import {POSTGRE_CONFIG} from './Postgre.config';
import {PostgreQueries} from './PostgreQueries';
import {Pool} from 'pg';

export class PostgreDatabase implements DatabaseModel {
  private static instance: PostgreDatabase;
  private _con: Pool;
  private pgp: IMain = pgPromise();

  private config = {
    host: POSTGRE_CONFIG.host,
    port: POSTGRE_CONFIG.port,
    user: POSTGRE_CONFIG.user,
    password: POSTGRE_CONFIG.password,
    database: 'postgres'  // default db
  };

  private constructor() {
    this._con = new Pool(this.config);
    this.connect()
      .then(() => console.log('PostgreSQL CONNECTED.'))
      .catch(err => console.error(err));
  }

  static getInstance(): PostgreDatabase {
    if (!PostgreDatabase.instance) {
      PostgreDatabase.instance = new PostgreDatabase();
    }
    return PostgreDatabase.instance;
  }

  /**
   *    DATABASE METHODS
   */
  async connect(): Promise<void> {
    try {
      // await this._con.connect();
      await this.initDb();
    } catch (e) {
      console.error(e);
      throw new DatabaseConnectionErr('PostgreSQL connection failed.');
    }
  }

  async initDb(): Promise<any> {
    try {
      await this.exec(PostgreQueries.POSTGRE_DROP_DB);
      await this.exec(PostgreQueries.POSTGRE_CREATE_DB);
      await this.switchDb();
      await this.exec(PostgreQueries.POSTGRE_CREATE_TABLES);
      await this.exec(PostgreQueries.POSTGRE_CREATE_TABLES2);
      await this.exec(PostgreQueries.POSTGRE_INDEXES);
    } catch (e) {
      console.error(e);
      throw new ClearDatabaseErr('PostgreSQL init database failed.');
    }
  }

  async clearDB(): Promise<any> {
    try {
      await this.exec(PostgreQueries.POSTGRE_DROP_TABLES);
      await this.exec(PostgreQueries.POSTGRE_CREATE_TABLES);
      await this.exec(PostgreQueries.POSTGRE_CREATE_TABLES2);
      await this.exec(PostgreQueries.POSTGRE_INDEXES);
    } catch (e) {
      console.error(e);
      throw new ClearDatabaseErr(`PostgreSQL clear database failed.`);
    }
  }

  async switchDb(): Promise<any> {
    this.config.database = POSTGRE_CONFIG.db_name;
    this._con = this.pgp(this.config);
    await this._con.connect();
  }

  async exec(sql: string): Promise<any> {
    return this._con.query(sql);
  }
}
