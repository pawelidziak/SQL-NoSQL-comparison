import * as mysql from 'mysql';
import {Connection} from 'mysql';
import {DatabaseConnectionErr} from '../../infrastructure/errors/DatabaseConnectionErr';
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
export class MysqlDatabase {
  private static instance: MysqlDatabase;
  private readonly _con: Connection;

  /**
   * 1. Create con to server
   * 2. Connect to server
   * 3. If database exist drop it
   * 4. Create new database
   */
  private constructor() {
    this._con = this.createConnection();
    this.connect();
    this.clearDbAndCreateTables();
  }

  getConnection(): Connection {
    return this._con;
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
  private createConnection(): Connection {
    return mysql.createConnection({
      host: MYSQL_CONFIG.host,
      user: MYSQL_CONFIG.user,
      password: MYSQL_CONFIG.password,
      multipleStatements: true
    });
  }

  private connect(): void {
    this._con.connect((err) => {
      if (err) throw new DatabaseConnectionErr('MySQL connection failed.');
      console.log('MySQL CONNECTED');
    });
  }

  /**
   * Method first check if db exists. If yes -> drop database. Then it create
   * new db
   */
  clearDbAndCreateTables() {
    this._con.query(MysqlQueries.MYSQL_INIT, (err1) => {
      if (err1) throw err1;
      this._con.config.database = MYSQL_CONFIG.db_name;
    });
  }

  exec(sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._con.query(sql, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}
