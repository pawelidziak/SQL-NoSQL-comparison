import {CASSANDRA_CONFIG} from "./Cassandra.config";

export class CassandraQueries {
  static PARENTS_TABLE = 'parents';
  static CHILDREN_TABLE = 'children';

  static CASSANDRA_DROP_DB = `DROP KEYSPACE IF EXISTS ${CASSANDRA_CONFIG.db_name}`;
  static CASSANDRA_CREATE_DB = `CREATE KEYSPACE ${CASSANDRA_CONFIG.db_name}
          WITH REPLICATION = { 
           'class' : 'SimpleStrategy', 
           'replication_factor' : 1 
          };`;
  static CASSANDRA_USE_DB = `USE ${CASSANDRA_CONFIG.db_name}`;
  // static CASSANDRA_DROP_TABLES = `DROP TABLE IF EXISTS ${CassandraQueries.CHILDREN_TABLE}; DROP TABLE IF EXISTS ${CassandraQueries.PARENTS_TABLE};`;
  static CASSANDRA_DROP_PARENT = `DROP TABLE IF EXISTS ${CassandraQueries.PARENTS_TABLE};`;
  static CASSANDRA_DROP_CHILD = `DROP TABLE IF EXISTS ${CassandraQueries.CHILDREN_TABLE};`;
  static CASSANDRA_CREATE_TABLES = `CREATE TABLE parents (
    parentId text PRIMARY KEY,
    name text
  );`;
}
