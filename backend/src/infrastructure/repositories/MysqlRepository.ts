import {ParentI} from '../../core/models/ParentModel';
import {MysqlDatabase} from '../../db/mysql/MysqlDatabase';

export class MysqlRepository {
  private mysqlDatabase: MysqlDatabase;

  constructor() {
    this.mysqlDatabase = MysqlDatabase.getInstance();
  }

  async dropIndexes() {

  }

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
    return await this.mysqlDatabase.exec(sql);
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
    return await this.mysqlDatabase.exec(sql);
  }

  async createOneParent(obj: ParentI): Promise<any> {
    const sql = `INSERT INTO parents (name) VALUES ('${obj.name}')`;
    return await this.mysqlDatabase.exec(sql);
  }

  async readOneIgnoreIndex(name: string): Promise<any> {
    const sql = `SELECT 
                    children.childId as ChildId_CHILD,
                    children.parentId as ParentId_CHILD,
                    children.name as Name_CHILD,
                    parents.parentId as ParentId_PARENT,
                    parents.name as Name_PARENT
                 FROM children 
                 ignore index(childRead)
                 JOIN parents
                 WHERE children.name = '${name}' AND children.parentId = parents.parentId;
    `;
    return await this.mysqlDatabase.exec(sql);
  }

  async readOneWithIndex(name: string): Promise<any> {
    const sql = `SELECT 
                    children.childId as ChildId_CHILD,
                    children.parentId as ParentId_CHILD,
                    children.name as Name_CHILD,
                    parents.parentId as ParentId_PARENT,
                    parents.name as Name_PARENT
                 FROM children JOIN parents
                 WHERE children.name = '${name}' AND children.parentId = parents.parentId;
    `;
    return await this.mysqlDatabase.exec(sql);
  }

  async readOne(name: string): Promise<any> {
    const sql = `SELECT 
                    children.childId as ChildId_CHILD,
                    children.parentId as ParentId_CHILD,
                    children.name as Name_CHILD,
                    parents.parentId as ParentId_PARENT,
                    parents.name as Name_PARENT
                 FROM children JOIN parents
                 WHERE children.name = '${name}' AND children.parentId = parents.parentId;
    `;
    return await this.mysqlDatabase.exec(sql);
  }

  async updateOneParent(id: string, newValue: string): Promise<any> {
    const sql =
      `UPDATE parents SET name = '${newValue}' WHERE parentId = ${id}`;
    return await this.mysqlDatabase.exec(sql);
  }

  async deleteOneParents(id: string): Promise<any> {
    const sql = `DELETE FROM parents WHERE parentId = ${id}`;
    return await this.mysqlDatabase.exec(sql);
  }
}
