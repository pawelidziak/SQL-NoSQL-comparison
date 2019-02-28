import {ParentI} from '../../core/models/ParentModel';
import {PostgreDatabase} from '../../db/postgre/PostgreDatabase';
import {Benchmark} from '../../utils/Benchmark';
import {CreateErr, DeleteErr, ReadErr, UpdateErr} from '../errors';
import {PostgreRepository} from '../repositories/PostgreRepository';

export class PostgreService {
  private readonly repo: PostgreRepository;

  constructor() {
    this.repo = new PostgreRepository();
  }

  /**
   * 1. Clear database
   * 2. Add objects in loop
   * @param parentModels - objects to create
   */
  async createMany(parentModels: ParentI[]) {
    await PostgreDatabase.getInstance().clearDB();
    const time = new Benchmark();

    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
          .catch(
              () => new CreateErr('PostgreSQL CREATE in createMany() failed.'));
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
    await PostgreDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
          .then(data => idArray.push(data.parentid))
          .catch(
              () => new CreateErr('PostgreSQL CREATE in readMany() failed.'));
    }

    //  then read
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.readOne(idArray[i])
          .catch(() => new ReadErr('PostgreSQL READ in readMany() failed.'));
    }

    return (time.elapsed());
  }

  /**
   * 1. Clear database
   * 2. Create given objects to database
   * 3. Save their id's
   * 4. Start timer and update all objects
   * 5. Stop timer
   * @param parentModels - objects to update
   */
  async updateMany(parentModels: ParentI[]) {
    await PostgreDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
          .then(data => idArray.push(data.parentid))
          .catch(
              () => new CreateErr('PostgreSQL CREATE in updateMany() failed.'));
    }

    // then update
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.updateOne(idArray[i], `Updated ${i + 1}`)
          .catch(
              () => new UpdateErr('PostgreSQL UPDATE in updateMany() failed.'));
    }

    return (time.elapsed());
  }

  /**
   * 1. Clear database
   * 2. Create given objects to database
   * 3. Save their id's
   * 4. Start timer and delete all objects
   * 5. Stop timer
   * @param parentModels - objects to delete
   */
  async deleteMany(parentModels: ParentI[]) {
    await PostgreDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
          .then(data => idArray.push(data.parentid))
          .catch(
              () => new CreateErr('PostgreSQL CREATE in deleteMany() failed.'));
    }

    // then delete
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.deleteOne(idArray[i])
          .catch(() => new DeleteErr('MySQL DELETE in deleteMany() failed.'));
    }

    return (time.elapsed());
  }
}
