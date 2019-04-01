import {RequestModel} from "../../core/models/RequestModel";
import {MongoDatabase} from "../../db/mongo/MongoDatabase";
import {MysqlDatabase} from "../../db/mysql/MysqlDatabase";
import {PostgreDatabase} from "../../db/postgre/PostgreDatabase";
import {CassandraDatabase} from "../../db/cassandra/CassandraDatabase";
import {ParentI} from "../../core/models/ParentModel";
import {GenerateData} from "../../utils/GenerateData";

export class AllDatabasesService {
  constructor() {

  }

  async clearAllDatabases() {
    await MongoDatabase.getInstance().clearDB();
    await MysqlDatabase.getInstance().clearDB();
    await PostgreDatabase.getInstance().clearDB();
    await CassandraDatabase.getInstance().clearDB();
  }

  generateInstances(req: RequestModel) {
    const parentModels: ParentI[] = GenerateData.getParents(req);

  }

  private mySqlCreate(parents: ParentI[]) {

  }
}
