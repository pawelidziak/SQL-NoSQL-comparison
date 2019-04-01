import {ParentI} from '../../core/models/ParentModel';
import {CassandraDatabase} from '../../db/cassandra/CassandraDatabase';

export class CassandraRepository {
  private readonly cassandraDatabase: CassandraDatabase;

  constructor() {
    this.cassandraDatabase = CassandraDatabase.getInstance();
  }

  async createOne(obj: ParentI): Promise<any> {
    const csql = `INSERT INTO parents (parentId, name) VALUES ('${obj.parentId}', '${obj.name}')`;
    return await this.cassandraDatabase.exec(csql);

  }

  async readOne(id: string) {
    const csql = `SELECT * FROM parents WHERE parentId = '${id}'`;
    return await this.cassandraDatabase.exec(csql);
  }

  async readAll() {
    // TODO
  }

  async updateOne(id: string, newValue: string) {
    const csql = `UPDATE parents SET name = '${newValue}' WHERE parentId = '${id}'`;
    return await this.cassandraDatabase.exec(csql);
  }

  async deleteOne(id: string) {
    const csql = `DELETE FROM parents WHERE parentId = '${id}'`;
    return await this.cassandraDatabase.exec(csql);
  }
}
