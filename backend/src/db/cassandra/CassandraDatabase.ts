import {DatabaseModel} from '../DatabaseModel';

export class CassandraDatabase implements DatabaseModel {
  private static instance: CassandraDatabase;

  private constructor() {
    // TODO
  }

  static getInstance(): CassandraDatabase {
    if (!CassandraDatabase.instance) {
      CassandraDatabase.instance = new CassandraDatabase();
    }
    return CassandraDatabase.instance;
  }
  /**
   *    DATABASE METHODS
   */
  async connect(): Promise<void> {
    // TODO
  }

  async initDb(): Promise<any> {
    // TODO
  }

  async clearDB(): Promise<any> {
    // TODO
  }

  async switchDb(): Promise<any> {
    // TODO
  }

  async exec(sql: string): Promise<any> {
    // TODO
  }
}
