export interface DbResult {
  dbName: DbName;
  time: number;
}

export enum DbName {
  MongoDB = 'MongoDB',
  MySQL = 'MySQL',
  PostgreSQL = 'PostgreSQL',
  Cassandra = 'Cassandra'
}
