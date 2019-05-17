import {ParentI} from '../../core/models/ParentModel';
import {PostgreDatabase} from '../../db/postgre/PostgreDatabase';

export class PostgreRepository {
  private readonly postgreDatabase: PostgreDatabase;

  constructor() {
    this.postgreDatabase = PostgreDatabase.getInstance();
  }

  async dropIndexes() {
    const sql = 'drop index if exists childread';
    await this.postgreDatabase.exec(sql);
  }

  /**
   * CREATE
   */
  async createManyParents(objs: any[]): Promise<any> {
    let sql = `INSERT INTO parents (name, parentId) VALUES `;
    for (let i = 0; i < objs.length; i++) {
      sql += `('${objs[i].name}', '${objs[i].parentId}')`;
      if (i < objs.length - 1) {
        sql += ',';
      } else {
        sql += ';';
      }
    }
    return await this.postgreDatabase.exec(sql);
  }

  async createManyChildren(objs: any[]): Promise<any> {
    let sql = `INSERT INTO children (name, childId, parentId) VALUES `;
    for (let i = 0; i < objs.length; i++) {
      sql += `('${objs[i].name}', '${objs[i].childId}', '${objs[i].parentId}')`;
      if (i < objs.length - 1) {
        sql += ',';
      } else {
        sql += ';';
      }
    }
    return await this.postgreDatabase.exec(sql);
  }

  async createOneParent(obj: ParentI) {
    const sql =
      `INSERT INTO parents (name) VALUES ('${obj.name}') RETURNING parentId`;
    return await this.postgreDatabase.exec(sql);
  }


  /**
   * READ
   */
  async readOne(name: string): Promise<any> {
    const sql = `SELECT 
                    children.childId as ChildId_CHILD,
                    children.parentId as ParentId_CHILD,
                    children.name as Name_CHILD,
                    parents.parentId as ParentId_PARENT,
                    parents.name as Name_PARENT
                 FROM children 
                 JOIN parents ON (children.parentId = parents.parentId)
                 WHERE children.name = '${name}';
    `;
    return await this.postgreDatabase.exec(sql);
  }

  /**
   * UPDATE
   */
  async updateOneParent(id: string, newValue: string) {
    const sql =
      `UPDATE parents SET name = '${newValue}' WHERE parentId = ${id}`;
    return await this.postgreDatabase.exec(sql);
  }

  /**
   * DELETE
   */
  async deleteOneParent(id: string) {
    const sql = `DELETE FROM parents WHERE parentId = ${id}`;
    return await this.postgreDatabase.exec(sql);
  }
}
