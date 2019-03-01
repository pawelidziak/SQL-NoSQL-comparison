import {ParentI} from '../../core/models/ParentModel';
import {Benchmark} from '../../utils/Benchmark';
import {CreateErr, DeleteErr, ReadErr, UpdateErr} from '../errors';
import {CassandraRepository} from '../repositories/CassandraRepository';

export class CassandraService {
  private readonly repo: CassandraRepository;

  constructor() {
    this.repo = new CassandraRepository();
  }

  /**
   * 1. Clear database
   * 2. Add objects in loop
   * @param parentModels - objects to create
   */
  async createMany(parentModels: ParentI[]) {
    // TODO clear db
    const time = new Benchmark();

    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
          .catch(
              () => new CreateErr('Cassandra CREATE in createMany() failed.'));
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
    // TODO clear db
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
          .then(data => idArray.push(data.parentid))
          .catch(() => new CreateErr('Cassandra CREATE in readMany() failed.'));
    }

    //  then read
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.readOne(idArray[i])
          .catch(() => new ReadErr('Cassandra READ in readMany() failed.'));
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
    // TODO clear db
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
          .then(data => idArray.push(data.parentid))
          .catch(
              () => new CreateErr('Cassandra CREATE in updateMany() failed.'));
    }

    // then update
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.updateOne(idArray[i], `Updated ${i + 1}`)
          .catch(
              () => new UpdateErr('Cassandra UPDATE in updateMany() failed.'));
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
    // TODO clear db
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
          .then(data => idArray.push(data.parentid))
          .catch(
              () => new CreateErr('Cassandra CREATE in deleteMany() failed.'));
    }

    // then delete
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.deleteOne(idArray[i])
          .catch(
              () => new DeleteErr('Cassandra DELETE in deleteMany() failed.'));
    }

    return (time.elapsed());
  }
}
