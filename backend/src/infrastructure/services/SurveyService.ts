import {DbName} from '../../core/models/DbName';
import {OperationType} from '../../core/models/OperationType';
import {ParentI} from '../../core/models/ParentModel';
import {RequestModel} from '../../core/models/RequestModel';
import {GenerateData} from '../../utils/GenerateData';
import {DbResult} from '../dto/DbResult';

import {CassandraService, MongoService, MysqlService, PostgreService} from './index';
import {SurveyResult} from "../dto/SurveyResult";


export class SurveyService {
  private mongoService: MongoService;
  private mysqlService: MysqlService;
  private postgreService: PostgreService;
  private cassandraService: CassandraService;

  constructor() {
    this.mongoService = new MongoService();
    this.mysqlService = new MysqlService();
    this.postgreService = new PostgreService();
    this.cassandraService = new CassandraService();

  }

  async surveyCreate(reqModel: RequestModel): Promise<SurveyResult> {
    const allInstances: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.mongoService.createMany(allInstances, reqModel))
    });

    // PostgreSQL
    result.push({
      dbName: DbName.PostgreSQL,
      time: await this.calculateAverageTime(
        reqModel.testsReps,
        () => this.postgreService.createMany(allInstances, reqModel))
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.mysqlService.createMany(allInstances, reqModel))
    });

    // Cassandra
    // result.push({
    //   dbName: DbName.Cassandra,
    //   time: await this.calculateAverageTime(
    //     reqModel.testsReps,
    //     () => this.cassandraService.createMany(allInstances, reqModel.dbSize))
    // });

    return {
      dbSize: reqModel.dbSize,
      operation: OperationType.CREATE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async surveyReadNoIndexes(reqModel: RequestModel): Promise<SurveyResult> {
    const parentInstances: ParentI[] = GenerateData.getParents(reqModel);
    const childInstances: any[] = GenerateData.getChildren(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.mongoService.readNoIndexes(parentInstances, childInstances, reqModel))
    });

    // PostgreSQL
    result.push({
      dbName: DbName.PostgreSQL,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.postgreService.readNoIndexes(parentInstances, childInstances, reqModel))
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.mysqlService.readNoIndexes(parentInstances, childInstances, reqModel))
    });
    // Cassandra
    // result.push({
    //   dbName: DbName.Cassandra,
    //   time: await this.calculateAverageTime(
    //     reqModel.testsReps,
    //     () => this.cassandraService.readNoIndx(parentInstances, reqModel.dbSize))
    // });

    return {
      dbSize: reqModel.dbSize,
      operation: OperationType.READ_NO_INDEXES,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async surveyReadWithIndexes(reqModel: RequestModel): Promise<SurveyResult> {
    const parentInstances: ParentI[] = GenerateData.getParents(reqModel);
    const childInstances: any[] = GenerateData.getChildren(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.mongoService.readWithIndexes(parentInstances, childInstances, reqModel))
    });

    // PostgreSQL
    result.push({
      dbName: DbName.PostgreSQL,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.postgreService.readWithIndexes(parentInstances, childInstances, reqModel))
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.mysqlService.readWithIndexes(parentInstances, childInstances, reqModel))
    });
    // Cassandra
    // result.push({
    //   dbName: DbName.Cassandra,
    //   time: await this.calculateAverageTime(
    //     reqModel.testsReps,
    //     () => this.cassandraService.readNoIndx(parentInstances, reqModel.dbSize))
    // });

    return {
      dbSize: reqModel.dbSize,
      operation: OperationType.READ_INDEXES ,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async updateMany(reqModel: RequestModel): Promise<SurveyResult> {
    const allInstances: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.mongoService.updateMany(allInstances, reqModel))
    });

    // PostgreSQL
    result.push({
      dbName: DbName.PostgreSQL,
      time: await this.calculateAverageTime(
        reqModel.testsReps,
        () => this.postgreService.updateMany(allInstances, reqModel))
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.mysqlService.updateMany(allInstances, reqModel))
    });
    // Cassandra
    // result.push({
    //   dbName: DbName.Cassandra,
    //   time: await this.calculateAverageTime(
    //     reqModel.testsReps,
    //     () => this.cassandraService.updateMany(allInstances, reqModel.dbSize))
    // });

    return {
      dbSize: reqModel.dbSize,
      operation: OperationType.UPDATE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async deleteMany(reqModel: RequestModel): Promise<SurveyResult> {
    const allInstances: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.mongoService.deleteMany(allInstances, reqModel))
    });

    // PostgreSQL
    result.push({
      dbName: DbName.PostgreSQL,
      time: await this.calculateAverageTime(
        reqModel.testsReps,
        () => this.postgreService.deleteMany(allInstances, reqModel))
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.calculateAverageTime(
        reqModel.testsReps, () => this.mysqlService.deleteMany(allInstances, reqModel))
    });


    // Cassandra
    // result.push({
    //   dbName: DbName.Cassandra,
    //   time: await this.calculateAverageTime(
    //     reqModel.testsReps,
    //     () => this.cassandraService.deleteMany(allInstances, reqModel.dbSize))
    // });

    return {
      dbSize: reqModel.dbSize,
      operation: OperationType.DELETE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  private async calculateAverageTime(tests: number, serviceFunction: any): Promise<number> {
    let averageTime = 0;
    for (let i = 0; i < tests; i++) {
      averageTime += await serviceFunction();
    }
    return Math.ceil(averageTime / tests);
  }
}
