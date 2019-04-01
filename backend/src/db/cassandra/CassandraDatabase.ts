// import {DatabaseModel} from '../DatabaseModel';
// import {ClearDatabaseErr, DatabaseConnectionErr} from "../../infrastructure/errors";
//
// const {DocumentStore, CreateDatabaseOperation, DeleteDatabasesOperation} = require('ravendb');
//
// export class CassandraDatabase implements DatabaseModel {
//   private static instance: CassandraDatabase;
//   private store = new DocumentStore(["http://127.0.0.1:8080"], "");
//   private session: any;
//
//   private constructor() {
//     // TODO
//     this.connect()
//       .then(() => console.log(`RavenDB CONNECTED.`))
//       .catch(err => console.error(err));
//   }
//
//   static getInstance(): CassandraDatabase {
//     if (!CassandraDatabase.instance) {
//       CassandraDatabase.instance = new CassandraDatabase();
//     }
//     return CassandraDatabase.instance;
//   }
//
//   /**
//    *    DATABASE METHODS
//    */
//   async connect(): Promise<void> {
//     try {
//       this.store.initialize();
//       await this.initDb();
//       // this.session = this.store.openSession('myDb');
//     } catch (e) {
//       console.error(e);
//       throw new DatabaseConnectionErr('MongoDB connection failed.');
//     }
//   }
//
//   async initDb(): Promise<any> {
//     await this.clearDB();
//   }
//
//   async clearDB(): Promise<any> {
//     try {
//       await this.store.maintenance.server.send(new DeleteDatabasesOperation({
//         databaseNames: ['databaseName'],
//         hardDelete: true,
//         fromNode: null,
//         timeToWaitForConfirmation: null
//       }));
//
//
//     } catch (e) {
//       console.error(e);
//       throw new ClearDatabaseErr(`MongoDB clear database failed.`);
//     }
//   }
//
//   async switchDb(): Promise<any> {
//     // TODO
//   }
//
//   exec(): any {
//     return this.session;
//   }
//
//   cos(func: any){
//     return new Promise((resolve, reject) => {
//       func((err: any, res: any) => {
//         if (err) reject(err);
//         resolve(res);
//       });
//     });
//   }
// }
import {DatabaseModel} from '../DatabaseModel';
import {ClearDatabaseErr, DatabaseConnectionErr} from "../../infrastructure/errors";

const {DocumentStore, CreateDatabaseOperation, DeleteDatabasesOperation} = require('ravendb');
import * as cassandra from 'cassandra-driver';
import {Client} from "cassandra-driver";
import {CassandraQueries} from "./CassandraQueries";
import {CASSANDRA_CONFIG} from "./Cassandra.config";

export class CassandraDatabase implements DatabaseModel {
  private static instance: CassandraDatabase;
  private store = new DocumentStore(["http://127.0.0.1:8080"], "");
  private session: any;
  private _con: Client;
  private config = {
    contactPoints: [`${CASSANDRA_CONFIG.host}`],
    localDataCenter: 'datacenter1'
  };

  private constructor() {
    this._con = new cassandra.Client(this.config);
    this.connect()
      .then(() => console.log(`Cassandra CONNECTED.`))
      .catch(err => console.error(err));
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
    try {
      await this._con.connect();
      await this.initDb();
    } catch (e) {
      console.error(e);
      throw new DatabaseConnectionErr('Cassandra connection failed.');
    }
  }

  async initDb(): Promise<any> {
    try {
      await this.exec(CassandraQueries.CASSANDRA_DROP_DB);
      await this.exec(CassandraQueries.CASSANDRA_CREATE_DB);
      await this.exec(CassandraQueries.CASSANDRA_USE_DB);
      await this.exec(CassandraQueries.CASSANDRA_CREATE_TABLES);
     await this.clearDB();
    } catch (e) {
      console.error(e);
      throw new ClearDatabaseErr(`Cassandra clear database failed.`);
    }
  }

  async clearDB(): Promise<any> {
    try {
      // await this.exec(CassandraQueries.CASSANDRA_DROP_TABLES);
      await this.exec(CassandraQueries.CASSANDRA_DROP_CHILD);
      await this.exec(CassandraQueries.CASSANDRA_DROP_PARENT);
      await this.exec(CassandraQueries.CASSANDRA_CREATE_TABLES);
    } catch (e) {
      console.error(e);
      throw new ClearDatabaseErr(`MySQL clear database failed.`);
    }
  }

  async switchDb(): Promise<any> {
    // TODO
  }

  async exec(command: string): Promise<any> {
    return this._con.execute(command);
  }

}
