import {QueryModel} from '@modules/info/db-queries/QueryModel';


/**
 * MONGO ENTRY
 */
const MONGO_CONFIG = `export const MONGODB_CONFIG = {
  db_name: 'mgrMongo',
  host: 'localhost',
  port: '27017',
};
export const DB_URL = \`mongodb://\${MONGODB_CONFIG.host}:\${MONGODB_CONFIG.port}/\${MONGODB_CONFIG.db_name}\`;`;

const MONGO_CONNECT = `connect(): void {
  if (!this._database) {
    MongoClient.connect(this.DB_URL, {useNewUrlParser: true}, (err, db) => {
      if (err) throw new DatabaseConnectionErr('MongoDB connection failed.');
      this._database = db;
      console.log('Mongo CONNECTED');
      db.db().dropDatabase().then(() => {
        db.db().createCollection(this.PARENTS_COL);
      });
    });
  }
}`;

const MONGO_GET_DB = `getDatabase(): Db {
  return this._database.db();
}`;

/**
 * MONGO SIMPLE
 */
const MONGO_CREATE_SIMPLE = `async create(obj: ParentI) {
  return await this.mongoDatabase.getDatabase()
    .collection('parents')
    .insertOne(Object.assign({}, obj));
}`;

const MONGO_READ_SIMPLE = `async read(id: string) {
  return await this.mongoDatabase.getDatabase()
    .collection('parents')
    .findOne({'_id': new ObjectID(id)});
}`;

const MONGO_UPDATE_SIMPLE = `async update(id: string, newValue: string) {
  return await this.mongoDatabase.getDatabase()
    .collection('parents')
    .updateOne({'_id': new ObjectID(id)}, {$set: {name: newValue}});
}`;

const MONGO_DELETE_SIMPLE = `async deleteOne(id: string) {
  return await this.mongoDatabase.getDatabase()
    .collection('parents')
    .deleteOne({'_id': new ObjectID(id)});
}`;

/**
 * MONGO COMPLEX
 */
const MONGO_CREATE_COMPLEX = ``;

const MONGO_READ_COMPLEX = ``;

const MONGO_UPDATE_COMPLEX = ``;

const MONGO_DELETE_COMPLEX = ``;


export const MongolEntry: QueryModel[] = [
  {
    title: 'Configuration',
    code: MONGO_CONFIG,
    desc: 'File with MongoDB database configuration'
  },
  {
    title: 'Connection',
    code: MONGO_CONNECT,
    desc: 'The method checks if database already exists. If not, it creates new connection, drops all collections and creates new ones.'
  },
  {
    title: 'Get database',
    code: MONGO_GET_DB,
    desc: 'To enable communication with the database from other parts of the applications, we have a method that returns the Mongo database object.'
  }
];

export const MongoSimpleQueries: QueryModel[] = [
  {
    title: 'Create - insertOne()',
    code: MONGO_CREATE_SIMPLE,
    desc: ''
  },
  {
    title: 'Read - findOne()',
    code: MONGO_READ_SIMPLE,
    desc: ''
  },
  {
    title: 'Update - updateOne()',
    code: MONGO_UPDATE_SIMPLE,
    desc: ''
  },
  {
    title: 'Delete - deleteOne()',
    code: MONGO_DELETE_SIMPLE,
    desc: ''
  }
];


export const MongoComplexQueries: QueryModel[] = [
  {
    title: '',
    code: MONGO_CREATE_COMPLEX,
    desc: ''
  },
  {
    title: '',
    code: MONGO_READ_COMPLEX,
    desc: ''
  },
  {
    title: '',
    code: MONGO_UPDATE_COMPLEX,
    desc: ''
  },
  {
    title: '',
    code: MONGO_DELETE_COMPLEX,
    desc: ''
  }
];
