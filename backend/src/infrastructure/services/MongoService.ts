import {ParentI,} from '../../core/models/ParentModel';
import {MongoDatabase} from '../../db/mongo/MongoDatabase';
import {Benchmark} from '../../utils/Benchmark';
import {CreateErr, DeleteErr, ReadErr, UpdateErr} from '../errors';
import {MongoRepository} from '../repositories/MongoRepository';

export class MongoService {
  private readonly repo: MongoRepository;

  constructor() {
    this.repo = new MongoRepository();
  }

  /**
   * 1. Clear database
   * 2. Add objects in loop
   * @param allInstances
   * @param quantity
   */
  async createMany(allInstances: ParentI[], quantity: number) {
    await MongoDatabase.getInstance().clearDB();

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .catch(() => new CreateErr('MongoDB CREATE in createMany() failed.'));
    }

    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
      await this.repo.createOne(allInstances[i])
        .catch(() => new CreateErr('MongoDB CREATE in createMany() failed.'));
    }

    return (time.elapsed());
  }

  /**
   * 1. Clear database
   * 2. Create given objects to database
   * 3. Save their id's
   * 4. Start timer and read all objects
   * 5. Stop timer
   * @param allInstances - objects to read
   * @param quantity
   */
  async readMany(allInstances: ParentI[], quantity: number) {
    await MongoDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .then(res => {
          if (i < quantity) {
            idArray.push(res.insertedId.toHexString());
          }
        })
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
   * @param allInstances
   * @param quantity
   */
  async updateMany(allInstances: ParentI[], quantity: number) {
    await MongoDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .then(res => idArray.push(res.insertedId.toHexString()))
        .catch(() => new CreateErr('MongoDB CREATE in updateMany() failed.'));
    }

    // then update
    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
      await this.repo.updateOne(idArray[i], `Updated ${i + 1}`)
        .catch(() => new UpdateErr('Mongo read ERROR.'));
    }

    return (time.elapsed());
  }

  /**
   * 1. Clear database
   * 2. Create given objects to database
   * 3. Save their id's
   * 4. Start timer and delete all objects
   * 5. Stop timer
   * @param allInstances
   * @param quantity
   */
  async deleteMany(allInstances: ParentI[], quantity: number) {
    await MongoDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .then(res => idArray.push(res.insertedId.toHexString()))
        .catch(() => new CreateErr('MongoDB CREATE in deleteMany() failed.'));
    }

    // then delete
    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
      await this.repo.deleteOne(idArray[i])
        .catch(() => new DeleteErr('Mongo read ERROR.'));
    }

    return (time.elapsed());
  }
}
