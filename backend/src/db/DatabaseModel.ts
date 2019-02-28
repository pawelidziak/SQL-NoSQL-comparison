export interface DatabaseModel {
  connect(): Promise<any>;

  initDb(): Promise<any>;

  clearDB(): Promise<any>;

  exec(sql: string): Promise<any>;
}
