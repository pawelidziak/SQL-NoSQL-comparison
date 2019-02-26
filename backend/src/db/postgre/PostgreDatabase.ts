import * as pgPromise from 'pg-promise';
import {IDatabase, IMain} from 'pg-promise';
import {PostgreQueries} from "./PostgreQueries";
import {POSTGRE_CONFIG} from "./Postgre.config";
import {DatabaseConnectionErr} from "../../infrastructure/errors/DatabaseConnectionErr";

export class PostgreDatabase {
  private static instance: PostgreDatabase;
  private _con: IDatabase<any>;
  private pgp: IMain = pgPromise();
  private config = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root123',
    database: 'postgres'
  };

  private constructor() {
    this._con = this.pgp(this.config);
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

  getConnection(): IDatabase<any> {
    return this._con;
  }

  /**
   *    DATABASE METHODS
   */

  /**
   * Method first try to connect to default database.
   * Then drop (if exists) db with given name and creates new tables.
   */
  async connect(): Promise<void> {
    try {
      await this._con.connect();
      await this._con.none(PostgreQueries.POSTGRE_DROP_DB);
      await this._con.none(PostgreQueries.POSTGRE_CREATE_DB);
      await this.switchToDb();
      await this._con.none(PostgreQueries.POSTGRE_CREATE_TABLES);
    } catch (e) {
      throw new DatabaseConnectionErr('PostgreSQL connection failed.');
    }
  }

  /**
   * Method switches to database from config (given name)
   */
  private async switchToDb(): Promise<void> {
    this.config.database = POSTGRE_CONFIG.db_name;
    this._con = this.pgp(this.config);
    await this._con.connect();
  }

}
