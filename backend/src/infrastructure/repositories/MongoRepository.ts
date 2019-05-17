import {ObjectID} from 'bson';

import {ParentI} from '../../core/models/ParentModel';
import {MongoDatabase} from '../../db/mongo/MongoDatabase';

export class MongoRepository {
  private mongoDatabase: MongoDatabase;

  constructor() {
    this.mongoDatabase = MongoDatabase.getInstance();
  }

  async dropIndexes() {
    try {
      await this.mongoDatabase.exec().collection('children').dropIndex('name_1');
    } catch (e) {
      console.error(e);
    }
  }


  async createOneParent(obj: ParentI) {
    return await this.mongoDatabase.exec().collection('parents').insertOne(
      Object.assign({}, obj));
  }

  async createManyParents(objs: any[]) {
    return await this.mongoDatabase.exec().collection('parents').insertMany([...objs]);
  }

  async createManyChildren(objs: any[]) {
    return await this.mongoDatabase.exec().collection('children').insertMany([...objs]);
  }

  async createOneChild(obj: any) {
    return await this.mongoDatabase.exec().collection('children').insertOne(
      Object.assign({}, obj));
  }

  async readOne(idChild: string) {
    return await this.mongoDatabase.exec().collection('children')
      .aggregate([
        {$match: {'name': idChild}},
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

  async readOneComplex(idChild: string) {
    return await this.mongoDatabase.exec().collection('children')
      .aggregate([
        {$match: {'name': idChild}},
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
