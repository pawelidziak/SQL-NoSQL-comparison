import {ParentI} from '../../core/models/ParentModel';
import {MysqlDatabase} from '../../db/mysql/MysqlDatabase';

export class MysqlRepository {
  private mysqlDatabase: MysqlDatabase;

  constructor() {
    this.mysqlDatabase = MysqlDatabase.getInstance();
  }

  async createOneChild(obj: any): Promise<any> {
    const sql = `INSERT INTO children (name, parentId) VALUES ('${obj.name}', '${obj.parentId}')`;
    return await this.mysqlDatabase.exec(sql);
  }

  async createOneParent(obj: ParentI): Promise<any> {
    const sql = `INSERT INTO parents (name) VALUES ('${obj.name}')`;
    return await this.mysqlDatabase.exec(sql);
  }

  async readOneChild(id: string): Promise<any> {
    const sql = `SELECT * FROM children WHERE childId = ${id}`;
    return await this.mysqlDatabase.exec(sql);
  }

  async readAllParents(): Promise<any> {
    const sql = `SELECT * FROM parents`;
    return await this.mysqlDatabase.exec(sql);
  }

  async readOneParent(id: string): Promise<any> {
    const sql = `SELECT * FROM parents WHERE parentId = ${id}`;
    return await this.mysqlDatabase.exec(sql);
  }

  async readOneComplex(id: string): Promise<any> {
    // const sql = `SELECT * FROM children JOIN parents WHERE children.childId = ${id} AND children.parentId = parents.parentId;`;

    const sql = `SELECT 
                    children.childId as ChildId_CHILD,
                    children.parentId as ParentId_CHILD,
                    children.name as Name_CHILD,
                    parents.parentId as ParentId_PARENT,
                    parents.name as Name_PARENT
                 FROM children JOIN parents
                 WHERE children.childId = ${id} AND children.parentId = parents.parentId;;
    `;
    return await this.mysqlDatabase.exec(sql);
  }

  async updateOneChild(id: string, newValue: string): Promise<any> {
    const sql =
        `UPDATE children SET question = '${newValue}' WHERE childId = ${id}`;
    return await this.mysqlDatabase.exec(sql);
  }

  async updateOneParent(id: string, newValue: string): Promise<any> {
    const sql =
        `UPDATE parents SET name = '${newValue}' WHERE parentId = ${id}`;
    return await this.mysqlDatabase.exec(sql);
  }

  async deleteOneChild(id: string): Promise<any> {
    const sql = `DELETE FROM children WHERE childId = ${id}`;
    return await this.mysqlDatabase.exec(sql);
  }

  async deleteOneParents(id: string): Promise<any> {
    const sql = `DELETE FROM parents WHERE parentId = ${id}`;
    return await this.mysqlDatabase.exec(sql);
  }
}
