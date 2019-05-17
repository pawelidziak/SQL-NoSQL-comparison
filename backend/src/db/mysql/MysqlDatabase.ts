import * as mysql from 'mysql';
import {Connection} from 'mysql';
import {ConnectionConfig} from 'mysql';

import {ClearDatabaseErr, DatabaseConnectionErr} from '../../infrastructure/errors';
import {DatabaseModel} from '../DatabaseModel';

import {MYSQL_CONFIG} from './Mysql.config';
import {MysqlQueries} from './MysqlQueries';

/**
 *  Class with ONLY con methods
 *
 *  if con does not work, try run this command in MySQL Workbench:
 *  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY
 * 'YourPassword'
 *  https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
 */
export class MysqlDatabase implements DatabaseModel {
  private static instance: MysqlDatabase;
  private readonly _con: Connection;

  private config: ConnectionConfig = {
    host: MYSQL_CONFIG.host,
    user: MYSQL_CONFIG.user,
    port: MYSQL_CONFIG.port,
    password: MYSQL_CONFIG.password,
    multipleStatements: true
  };

  private constructor() {
    this._con = mysql.createConnection(this.config);
    this.connect()
        .then(() => console.log(`MySQL CONNECTED.`))
        .catch(err => console.error(err));
  }

  static getInstance(): MysqlDatabase {
    if (!MysqlDatabase.instance) {
      MysqlDatabase.instance = new MysqlDatabase();
    }
    return MysqlDatabase.instance;
  }

  /**
   *    DATABASE METHODS
   */
  async connect(): Promise<void> {
    try {
      await this._con.connect();
      await this.initDb();
    } catch (e) {
      console.error(e);
      throw new DatabaseConnectionErr('MySQL connection failed.');
    }
  }

  async initDb(): Promise<any> {
    try {
      await this.exec(MysqlQueries.MYSQL_DROP_DB);
      await this.exec(MysqlQueries.MYSQL_CREATE_DB);
      await this.exec(MysqlQueries.MYSQL_USE_DB);
      await this.exec(MysqlQueries.MYSQL_CREATE_TABLES);
      await this.exec(MysqlQueries.MYSQL_CREATE_TABLES2);
      await this.exec(MysqlQueries.MYSQL_INDEX);
    } catch (e) {
      console.error(e);
      throw new ClearDatabaseErr(`MySQL init database failed.`);
    }
  }

  async clearDB(): Promise<any> {
    try {
      await this.exec(MysqlQueries.MYSQL_DROP_TABLES);
      await this.exec(MysqlQueries.MYSQL_CREATE_TABLES);
      await this.exec(MysqlQueries.MYSQL_CREATE_TABLES2);
      await this.exec(MysqlQueries.MYSQL_INDEX);
    } catch (e) {
      console.error(e);
      throw new ClearDatabaseErr(`MySQL clear database failed.`);
    }
  }

  async exec(sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._con.query(sql, (err: any, res: any) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}
