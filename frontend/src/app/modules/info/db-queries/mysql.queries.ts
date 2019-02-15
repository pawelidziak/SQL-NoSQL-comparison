import {QueryModel} from '@modules/info/db-queries/QueryModel';

/**
 * MYSQL ENTRY
 */
const MYSQL_CONFIG = `export const MYSQL_CONFIG = {
  db_name: 'mgrMysql',
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root123',
};`;

const MYSQL_CREATE_CON = `createConnection(): Connection {
  return mysql.createConnection({
    host: MYSQL_CONFIG.host,
    user: MYSQL_CONFIG.user,
    password: MYSQL_CONFIG.password,
    multipleStatements: true
  });
}`;

const MYSQL_CONNECT = `connect(): void {
  this._con.connect((err) => {
    if (err) throw new DatabaseConnectionErr('MySQL connection failed.');
    console.log('MySQL CONNECTED');
  });
}`;

const MYSQL_DROP_CREATE = `clearDbAndCreateTables() {
  this._con.query(MysqlQueries.MYSQL_INIT, (err1) => {
    if (err1) throw err1;
    this._con.config.database = MYSQL_CONFIG.db_name;
  });
}`;

const MYSQL_INIT = `CREATE DATABASE IF NOT EXISTS my_db_name;
USE my_db_name;

DROP TABLE IF EXISTS my_first_table;
DROP TABLE IF EXISTS my_first_table;

CREATE TABLE my_first_table (
  parentId int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY (parentId)
);
`;


const MYSQL_EXEC = `exec(sql: string): Promise<any> {
  return new Promise((resolve, reject) => {
    this._con.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}`;

/**
 * MYSQL SIMPLE
 */
const MYSQL_CREATE_SIMPLE = `async create(obj: ParentI): Promise<any> {
  const sql = \`INSERT INTO parents (name) VALUES ('\${obj.name}')\`;
  return await this.mysqlDatabase.exec(sql);
}`;

const MYSQL_READ_SIMPLE = `async read(id: string): Promise<any> {
  const sql = \`SELECT * FROM parents WHERE parentId = \${id}\`;
  return await this.mysqlDatabase.exec(sql);
}`;

const MYSQL_UPDATE_SIMPLE = `async update(id: string, newValue: string): Promise<any> {
  const sql = \`UPDATE parents SET name = '\${newValue}' WHERE parentId = \${id}\`;
  return await this.mysqlDatabase.exec(sql);
}`;

const MYSQL_DELETE_SIMPLE = `async delete(id: string): Promise<any> {
  const sql = \`DELETE FROM parents WHERE parentId = \${id}\`;
  return await this.mysqlDatabase.exec(sql);
}`;

const MYSQL_CREATE_COMPLEX = ``;

const MYSQL_READ_COMPLEX = ``;

const MYSQL_UPDATE_COMPLEX = ``;

const MYSQL_DELETE_COMPLEX = ``;


export const MysqlEntry: QueryModel[] = [
  {
    title: 'Configuration',
    code: MYSQL_CONFIG,
    desc: 'File with MySQL database configuration'
  },
  {
    title: 'Create connection',
    code: MYSQL_CREATE_CON,
    desc: 'The method retrieves database settings and return new connection.'
  },
  {
    title: 'Connect',
    code: MYSQL_CONNECT,
    desc: 'The method connect to MySQL server.'
  },
  {
    title: 'Clear database',
    code: MYSQL_DROP_CREATE,
    desc: 'To get clear database every time, the method drops all tables and creates new ones by execute SQL init code (see next step)'
  },
  {
    title: 'SQL init',
    code: MYSQL_INIT,
    desc: 'SQL initialization commands. First create database, then drop tables and create new ones.'
  },
  {
    title: 'Query as Promise',
    code: MYSQL_EXEC,
    desc: 'Every query to MySQL is converted to new Promise. The method retrieves query as string and return new Promise.'
  }
];

export const MysqlSimpleQueries: QueryModel[] = [
  {
    title: 'Create - INSERT INTO',
    code: MYSQL_CREATE_SIMPLE,
    desc: 'The method retrieves the object and inserts its name in the database.'
  },
  {
    title: 'Read - SELECT',
    code: MYSQL_READ_SIMPLE,
    desc: 'The method retrieves the object\'s id, finds it in the database, and returns.'
  },
  {
    title: 'Update - UPDATE',
    code: MYSQL_UPDATE_SIMPLE,
    desc: 'The method retrieves the object\'s id and value to update. Then it finds object in the database, and returns.'
  },
  {
    title: 'Delete - DELETE FROM',
    code: MYSQL_DELETE_SIMPLE,
    desc: 'The method retrieves the object\'s id, finds it in the database and deletes it.'
  }
];


export const MysqlComplexQueries: QueryModel[] = [
  {
    title: '',
    code: MYSQL_CREATE_COMPLEX,
    desc: ''
  },
  {
    title: '',
    code: MYSQL_READ_COMPLEX,
    desc: ''
  },
  {
    title: '',
    code: MYSQL_UPDATE_COMPLEX,
    desc: ''
  },
  {
    title: '',
    code: MYSQL_DELETE_COMPLEX,
    desc: ''
  }
];
