import {PostgreDatabase} from "../../db/postgre/PostgreDatabase";
import {ParentI} from "../../core/models/ParentModel";

export class PostgreRepository {
  private readonly postgreDatabase: PostgreDatabase;

  constructor() {
    this.postgreDatabase = PostgreDatabase.getInstance();
  }

  async createOne(obj: ParentI) {
    // TODO
  }

  async readOne(id: string) {
    // TODO
  }

  async readAll() {
    // TODO
  }

  async updateOne(id: string, newValue: string) {
    // TODO
  }

  async deleteOne(id: string) {
    // TODO
  }
}
