import {ParentI} from '../../core/models/ParentModel';
import {CassandraDatabase} from '../../db/cassandra/CassandraDatabase';

export class CassandraRepository {
  private readonly cassandraDatabase: CassandraDatabase;

  constructor() {
    this.cassandraDatabase = CassandraDatabase.getInstance();
  }

  async createOne(obj: ParentI) {
    const sql = `TODO`;
    return await this.cassandraDatabase.exec(sql);
  }

  async readOne(id: string) {
    const sql = `TODO`;
    return await this.cassandraDatabase.exec(sql);
  }

  async readAll() {
    // TODO
  }

  async updateOne(id: string, newValue: string) {
    const sql = `TODO`;
    return await this.cassandraDatabase.exec(sql);
  }

  async deleteOne(id: string) {
    const sql = `TODO`;
    return await this.cassandraDatabase.exec(sql);
  }
}
