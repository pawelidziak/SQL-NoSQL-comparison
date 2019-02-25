import * as pgPromise from 'pg-promise';
import {IDatabase, IMain} from 'pg-promise';

export class PostgreDatabase {
  private static instance: PostgreDatabase;
  private readonly _con: IDatabase<any>;


  private constructor() {
    this._con = this.createConnection();
    this.connect();
    this.clearDbAndCreateTables();
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
  private createConnection(): IDatabase<any> {
    const pgp: IMain = pgPromise();

    const config = {
      host: 'localhost',
      port: 5432,
      database: 'pg-promise-demo',
      user: 'postgres'
    };
    return pgp(config);
  }

  connect(): void {

  }

  /**
   * Method first check if db exists. If yes -> drop database. Then it create
   * new db
   */
  clearDbAndCreateTables() {
    // TODO
  }
}
