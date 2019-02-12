import {ParentI,} from '../../core/models/ParentModel';
import {MongoDatabase} from '../../db/mongo/MongoDatabase';
import {Benchmark} from '../../utils/Benchmark';
import {CreateErr} from '../errors/CreateErr';
import {ReadErr} from '../errors/ReadErr';
import {MongoRepository} from '../repositories/MongoRepository';

export class MongoService {
  private repo: MongoRepository;

  constructor() {
    this.repo = new MongoRepository();
  }

  /**
   * 1. Clear database
   * 2.
   * @param parentModels - objects to create
   */
  async createMany(parentModels: ParentI[]) {
    await MongoDatabase.getInstance().getDatabase().dropDatabase();
    const time = new Benchmark();

    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i]).catch(() => {
        throw new CreateErr('MongoDB CREATE in createMany() failed.');
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
   * @param parentModels - objects to read
   */
  async readMany(parentModels: ParentI[]) {
    await MongoDatabase.getInstance().getDatabase().dropDatabase();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
          .then(res => idArray.push(res.insertedId.toHexString()))
          .catch(() => new CreateErr('MongoDB CREATE in readMany() failed.'));
    }

    //  then read
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.readOne(idArray[i])
          .catch(() => new ReadErr('MongoDB READ in readMany() failed.'));
    }

    return (time.elapsed());
  }

  /**
   * 1. Clear database
   * 2. Create given objects to database
   * 3. Save their id's
   * 4. Start timer and update all objects
   * 5. Stop timer
   * @param objList - objects to update
   */
  async updateMany(objList: ParentI[]) {
    await MongoDatabase.getInstance().getDatabase().dropDatabase();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < objList.length; i++) {
      await this.repo.createOne(objList[i])
          .then(res => idArray.push(res.insertedId.toHexString()))
          .catch(() => {
            throw new CreateErr('MongoDB CREATE in updateMany() failed.');
          });
    }

    // then update
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.updateOne(idArray[i], `Updated ${i}`).catch(() => {
        throw new Error('Mongo read ERROR.');
      });
    }

    return (time.elapsed());
  }


  /**
   * 1. Clear database
   * 2. Create given objects to database
   * 3. Save their id's
   * 4. Start timer and delete all objects
   * 5. Stop timer
   * @param objList - objects to delete
   */
  async deleteMany(objList: ParentI[]) {
    await MongoDatabase.getInstance().getDatabase().dropDatabase();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < objList.length; i++) {
      await this.repo.createOne(objList[i])
          .then(res => idArray.push(res.insertedId.toHexString()))
          .catch(() => {
            throw new CreateErr('MongoDB CREATE in deleteMany() failed.');
          });
    }

    // read then
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.deleteOne(idArray[i]).catch(() => {
        throw new Error('Mongo read ERROR.');
      });
    }

    return (time.elapsed());
  }
}
