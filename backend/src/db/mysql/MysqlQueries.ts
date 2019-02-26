import {MYSQL_CONFIG} from './Mysql.config';

export class MysqlQueries {
  static PARENTS_TABLE = 'parents';
  static CHILDREN_TABLE = 'children';

  static MYSQL_INIT = `
   CREATE DATABASE IF NOT EXISTS ${MYSQL_CONFIG.db_name}; 
   USE ${MYSQL_CONFIG.db_name};
   
   DROP TABLE IF EXISTS ${MysqlQueries.CHILDREN_TABLE};
   DROP TABLE IF EXISTS ${MysqlQueries.PARENTS_TABLE}; 
   
   CREATE TABLE ${MysqlQueries.PARENTS_TABLE} (
      parentId      int NOT NULL AUTO_INCREMENT,
      name          varchar(255),
      PRIMARY KEY   (parentId)
   );
   

`;
}

// CREATE TABLE ${MysqlQueries.CHILDREN_TABLE} (
//   childId int NOT NULL AUTO_INCREMENT,
//   parentId int NOT NULL,
//   question varchar(255),
//   PRIMARY KEY (childId),
//   FOREIGN KEY (parentId) REFERENCES parents(parentId)
// );
