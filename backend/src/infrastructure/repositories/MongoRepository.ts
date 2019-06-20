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

  /**
   * CREATE
   */
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

  /**
   * READ
   */
  async readOne(name: string) {
    return await this.mongoDatabase.exec().collection('children')
      .aggregate([
        {$match: {'name': name}},
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

  /**
   * UPDATE
   */
  async updateOneParent(id: string, newValue: string) {
    return await this.mongoDatabase.exec().collection('parents').updateOne(
      {'_id': new ObjectID(id)}, {$set: {name: newValue}});
  }

  /**
   * DELETE
   */
  async deleteOneParent(id: string) {
    return await this.mongoDatabase.exec().collection('parents').deleteOne(
      {'_id': new ObjectID(id)});
  }
}
