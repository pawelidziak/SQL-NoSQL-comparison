import {ParentI} from '../../core/models/ParentModel';
import {PostgreDatabase} from '../../db/postgre/PostgreDatabase';

export class PostgreRepository {
  private readonly postgreDatabase: PostgreDatabase;

  constructor() {
    this.postgreDatabase = PostgreDatabase.getInstance();
  }

  async createOne(obj: ParentI) {
    const sql =
      `INSERT INTO parents (name) VALUES ('${obj.name}') RETURNING parentId`;
    return await this.postgreDatabase.exec(sql);
  }

  // todo
  async createOneChild(obj: any) {
    const sql =
      `INSERT INTO children (name, parentId) VALUES ('${obj.name}', '${obj.parentId}') RETURNING childId`;
    return await this.postgreDatabase.exec(sql);
  }

  async readOne(id: string) {
    const sql = `SELECT * FROM parents WHERE parentId = ${id}`;
    return await this.postgreDatabase.exec(sql);
  }

  async readOneComplex(id: string) {
    const sql = `SELECT 
                    children.childId as ChildId_CHILD,
                    children.parentId as ParentId_CHILD,
                    children.name as Name_CHILD,
                    parents.parentId as ParentId_PARENT,
                    parents.name as Name_PARENT
                FROM children JOIN parents ON (children.parentId = parents.parentId)
                where children.childId = ${id};
    `;
    return await this.postgreDatabase.exec(sql);
  }

  async readAll() {
    // TODO
  }

  async updateOne(id: string, newValue: string) {
    const sql =
      `UPDATE parents SET name = '${newValue}' WHERE parentId = ${id}`;
    return await this.postgreDatabase.exec(sql);
  }

  async deleteOne(id: string) {
    const sql = `DELETE FROM parents WHERE parentId = ${id}`;
    return await this.postgreDatabase.exec(sql);
  }
}
