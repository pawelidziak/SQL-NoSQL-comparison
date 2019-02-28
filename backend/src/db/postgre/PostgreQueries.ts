import {POSTGRE_CONFIG} from './Postgre.config';

export class PostgreQueries {
  static PARENTS_TABLE = 'parents';
  static CHILDREN_TABLE = 'children';

  static POSTGRE_DROP_DB = `DROP DATABASE IF EXISTS ${POSTGRE_CONFIG.db_name}`;
  static POSTGRE_CREATE_DB = `CREATE DATABASE ${POSTGRE_CONFIG.db_name}`;
  static POSTGRE_DROP_TABLES =
      `DROP TABLE IF EXISTS ${PostgreQueries.CHILDREN_TABLE};
   DROP TABLE IF EXISTS ${PostgreQueries.PARENTS_TABLE};
   `;
  static POSTGRE_CREATE_TABLES =
      `CREATE TABLE ${PostgreQueries.PARENTS_TABLE} (
    parentId        SERIAL PRIMARY KEY NOT NULL,
    name            VARCHAR(100)
  );`;
}
