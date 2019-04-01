export interface DatabaseModel {
  connect(): Promise<any>;

  initDb?(): Promise<any>;

  clearDB(): Promise<any>;

  exec(commend?: string): Promise<any>|any;
}
