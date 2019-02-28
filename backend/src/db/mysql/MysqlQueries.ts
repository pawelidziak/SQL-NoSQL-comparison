import {MYSQL_CONFIG} from './Mysql.config';

export class MysqlQueries {
  static PARENTS_TABLE = 'parents';
  static CHILDREN_TABLE = 'children';

  static MYSQL_DROP_DB = `DROP DATABASE IF EXISTS ${MYSQL_CONFIG.db_name}`;
  static MYSQL_CREATE_DB = `CREATE DATABASE ${MYSQL_CONFIG.db_name}`;
  static MYSQL_USE_DB = `USE ${MYSQL_CONFIG.db_name}`;
  static MYSQL_DROP_TABLES =
      `DROP TABLE IF EXISTS ${MysqlQueries.CHILDREN_TABLE};
   DROP TABLE IF EXISTS ${MysqlQueries.PARENTS_TABLE};
   `;
  static MYSQL_CREATE_TABLES = `CREATE TABLE ${MysqlQueries.PARENTS_TABLE} (
      parentId      int NOT NULL AUTO_INCREMENT,
      name          varchar(255),
      PRIMARY KEY   (parentId)
   );`;
}

// CREATE TABLE ${MysqlQueries.CHILDREN_TABLE} (
//   childId int NOT NULL AUTO_INCREMENT,
//   parentId int NOT NULL,
//   question varchar(255),
//   PRIMARY KEY (childId),
//   FOREIGN KEY (parentId) REFERENCES parents(parentId)
// );
