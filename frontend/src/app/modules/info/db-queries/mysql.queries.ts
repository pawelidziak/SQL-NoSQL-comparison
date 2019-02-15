/**
 * MYSQL EXEC
 */
const MYSQL_EXEC = `exec(sql: string): Promise<any> {
  return new Promise((resolve, reject) => {
    this._con.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}
`;

/**
 * MYSQL SIMPLE
 */
const MYSQL_CREATE_SIMPLE = `async create(obj: ParentI): Promise<any> {
  const sql = \`INSERT INTO parents (name) VALUES ('\${obj.name}')\`;
  return await this.mysqlDatabase.exec(sql);
}`;

const MYSQL_READ_SIMPLE = `async read(id: string): Promise<any> {
  const sql = \`SELECT * FROM parents WHERE parentId = \${id}\`;
  return await this.mysqlDatabase.exec(sql);
}`;

const MYSQL_UPDATE_SIMPLE = `async update(id: string, newValue: string): Promise<any> {
  const sql = \`UPDATE parents SET name = '\${newValue}' WHERE parentId = \${id}\`;
  return await this.mysqlDatabase.exec(sql);
}`;

const MYSQL_DELETE_SIMPLE = `async delete(id: string): Promise<any> {
  const sql = \`DELETE FROM parents WHERE parentId = \${id}\`;
  return await this.mysqlDatabase.exec(sql);
}`;

const MYSQL_CREATE_COMPLEX = ``;

const MYSQL_READ_COMPLEX = ``;

const MYSQL_UPDATE_COMPLEX = ``;

const MYSQL_DELETE_COMPLEX = ``;

export const MysqlQueries = {
  mysqlExec: MYSQL_EXEC,

  mysqlCreateSimple: MYSQL_CREATE_SIMPLE,
  mysqlReadSimple: MYSQL_READ_SIMPLE,
  mysqlUpdateSimple: MYSQL_UPDATE_SIMPLE,
  mysqlDeleteSimple: MYSQL_DELETE_SIMPLE,

  mysqlCreateComplex: MYSQL_CREATE_COMPLEX,
  mysqlReadComplex: MYSQL_READ_COMPLEX,
  mysqlUpdateComplex: MYSQL_UPDATE_COMPLEX,
  mysqlDeleteComplex: MYSQL_DELETE_COMPLEX,
};
