import {DataModel} from '../../core/models/DataModel';
import {Benchmark} from '../../utils/Benchmark';
import {MongoRepository} from '../repositories/MongoRepository';
import {MongoDatabase} from "../../db/mongo/MongoDatabase";

export class MongoService {
  private repo: MongoRepository;

  constructor() {
    this.repo = new MongoRepository();
  }

  /**
   * 1. Clear database
   * 2.
   * @param objList - objects to create
   */
  async createMany(objList: DataModel[]) {
    MongoDatabase.getInstance().getDatabase().dropDatabase();
    const time = new Benchmark();

    for (let i = 0; i < objList.length; i++) {
      await this.repo.createOne(objList[i]).catch(() => {
        throw new Error('Mongo create ERROR.');
      });
    }

    return (time.elapsed());
  }

  /**
   * 1. Clear database
   * 2. Create given objects to database
   * 3. Save their id's
   * 4. Start timer and read all objects
   * 5. Stop timer
   * @param objList - objects to read
   */
  async readMany(objList: DataModel[]) {
    MongoDatabase.getInstance().getDatabase().dropDatabase();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < objList.length; i++) {
      await this.repo.createOne(objList[i])
        .then(res => idArray.push(res.insertedId.toHexString()))
        .catch(() => {
          throw new Error('Mongo create ERROR.');
        });
    }

    // read then
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.readOne(idArray[i]).catch(() => {
        throw new Error('Mongo read ERROR.');
      });
    }

    return (time.elapsed());
  }

  /**
   * 1. Clear database
   * 2. Create given objects to database
   * 3. Save their id's
   * 4. Start timer and update all objects
   * 5. Stop timer
   * @param objList - objects to read
   */
  async updateMany(objList: DataModel[]) {
    MongoDatabase.getInstance().getDatabase().dropDatabase();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < objList.length; i++) {
      await this.repo.createOne(objList[i])
        .then(res => idArray.push(res.insertedId.toHexString()))
        .catch(() => {
          throw new Error('Mongo create ERROR.');
        });
    }

    // read then
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.updateOne(idArray[i], `Updated ${i}`)
        .catch(() => {
          throw new Error('Mongo read ERROR.');
        });
    }

    return (time.elapsed());
  }

}
