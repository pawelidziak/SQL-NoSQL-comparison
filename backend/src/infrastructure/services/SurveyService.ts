import {DbResult} from '../dto/DbResult';
import {OperationType} from '../../core/models/OperationType';
import {ParentI} from '../../core/models/ParentModel';
import {RequestModel} from '../../core/models/RequestModel';
import {GenerateData} from '../../utils/GenerateData';

import {MongoService} from './MongoService';
import {MysqlService} from './MysqlService';
import {PostgreService} from './PostgreService';
import {DbName} from "../../core/models/DbName";


export class SurveyService {
  private mongoService: MongoService;
  private mysqlService: MysqlService;
  private postgreService: PostgreService;

  constructor() {
    this.mongoService = new MongoService();
    this.mysqlService = new MysqlService();
    this.postgreService = new PostgreService();
  }

  async surveyCreate(reqModel: RequestModel) {
    const parentModels: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.calculateAverageTime(
          reqModel.testsReps, () => this.mongoService.createMany(parentModels))
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.calculateAverageTime(
          reqModel.testsReps, () => this.mysqlService.createMany(parentModels))
    });

    // PostgreSQL
    result.push({
      dbName: DbName.PostgreSQL,
      time: await this.calculateAverageTime(
          reqModel.testsReps,
          () => this.postgreService.createMany(parentModels))
    });

    return {
      operation: OperationType.CREATE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async surveyRead(reqModel: RequestModel) {
    const parentModels: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.calculateAverageTime(
          reqModel.testsReps, () => this.mongoService.readMany(parentModels))
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.calculateAverageTime(
          reqModel.testsReps, () => this.mysqlService.readMany(parentModels))
    });

    // PostgreSQL
    result.push({
      dbName: DbName.PostgreSQL,
      time: await this.calculateAverageTime(
          reqModel.testsReps, () => this.postgreService.readMany(parentModels))
    });

    return {
      operation: OperationType.READ,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async updateMany(reqModel: RequestModel) {
    const parentModels: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.calculateAverageTime(
          reqModel.testsReps, () => this.mongoService.updateMany(parentModels))
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.calculateAverageTime(
          reqModel.testsReps, () => this.mysqlService.updateMany(parentModels))
    });

    // PostgreSQL
    result.push({
      dbName: DbName.PostgreSQL,
      time: await this.calculateAverageTime(
          reqModel.testsReps,
          () => this.postgreService.updateMany(parentModels))
    });

    return {
      operation: OperationType.UPDATE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  async deleteMany(reqModel: RequestModel) {
    const parentModels: ParentI[] = GenerateData.getParents(reqModel);
    const result: DbResult[] = [];

    // MongoDB
    result.push({
      dbName: DbName.MongoDB,
      time: await this.calculateAverageTime(
          reqModel.testsReps, () => this.mongoService.deleteMany(parentModels))
    });

    // MySQL
    result.push({
      dbName: DbName.MySQL,
      time: await this.calculateAverageTime(
          reqModel.testsReps, () => this.mysqlService.deleteMany(parentModels))
    });

    // PostgreSQL
    result.push({
      dbName: DbName.PostgreSQL,
      time: await this.calculateAverageTime(
          reqModel.testsReps,
          () => this.postgreService.deleteMany(parentModels))
    });

    return {
      operation: OperationType.DELETE,
      quantity: reqModel.quantity,
      dbResult: result
    };
  }

  private async calculateAverageTime(tests: number, serviceFunction: any):
      Promise<number> {
    let averageTime = 0;
    for (let i = 0; i < tests; i++) {
      averageTime += await serviceFunction();
    }
    return Math.ceil(averageTime / tests);
  }
}
