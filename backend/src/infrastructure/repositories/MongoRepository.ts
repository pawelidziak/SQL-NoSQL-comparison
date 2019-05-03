import {ObjectID} from 'bson';

import {ParentI} from '../../core/models/ParentModel';
import {MongoDatabase} from '../../db/mongo/MongoDatabase';

export class MongoRepository {
  private mongoDatabase: MongoDatabase;

  constructor() {
    this.mongoDatabase = MongoDatabase.getInstance();
  }

  async createOneParent(obj: ParentI) {
    return await this.mongoDatabase.exec().collection('parents').insertOne(
      Object.assign({}, obj));
  }

  async createOneChild(obj: any) {
    return await this.mongoDatabase.exec().collection('children').insertOne(
      Object.assign({}, obj));
  }

  async readOne(id: string) {
    return await this.mongoDatabase.exec().collection('parents')
      .aggregate([
        {$match: {'_id': new ObjectID(id)}}]);
  }

  async readOneComplex(idChild: string) {
    return await this.mongoDatabase.exec().collection('children')
      .aggregate([
        {$match: {'_id': new ObjectID(idChild)}},
        {
          $lookup: {
            from: 'parents',
            localField: 'parentId',
            foreignField: 'parentId',
            as: 'joinedData'
          }
        }
      ]);
  }

  async readAll() {
    return await this.mongoDatabase.exec().collection('parents').find();
  }
  async readAllComplex() {
    return await this.mongoDatabase.exec().collection('children')
      .aggregate([
        {
          $lookup: {
            from: 'parents',
            localField: 'parentId',
            foreignField: 'parentId',
            as: 'joinedData'
          }
        }
      ]);
  }

  async updateOne(id: string, newValue: string) {
    return await this.mongoDatabase.exec().collection('parents').updateOne(
      {'_id': new ObjectID(id)}, {$set: {name: newValue}});
  }

  async deleteOne(id: string) {
    return await this.mongoDatabase.exec().collection('parents').deleteOne(
      {'_id': new ObjectID(id)});
  }
}
