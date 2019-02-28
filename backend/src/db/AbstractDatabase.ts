import {DatabaseConnectionErr} from '../infrastructure/errors/DatabaseConnectionErr';

export abstract class AbstractDatabase {
  set con(value: any) {
    this._con = value;
  }

  set dbName(value: string) {
    this._dbName = value;
  }
  private _con: any;
  private _dbName: string;

  constructor(dbName: string) {
    this._dbName = dbName;
    // this.connect()
    //   .then(() => console.log(`${this.dbName} CONNECTED.`))
    //   .catch(err => console.error(err));
  }

  doIt() {
    this.connect()
        .then(() => console.log(`${this.dbName} CONNECTED.`))
        .catch(err => console.error(err));
  }

  async connect(): Promise<void> {
    try {
      await this._con.connect();
      await this.initDb();
    } catch (e) {
      throw new DatabaseConnectionErr('MySQL connection failed.');
    }
  }

  abstract async initDb(): Promise<any>;

  abstract async clearDB(): Promise<any>;

  abstract async exec(sql: string): Promise<any>;
}
