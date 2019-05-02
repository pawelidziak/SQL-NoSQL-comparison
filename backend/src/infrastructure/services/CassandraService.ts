import {ParentI} from '../../core/models/ParentModel';
import {Benchmark} from '../../utils/Benchmark';
import {CreateErr, DeleteErr, ReadErr, UpdateErr} from '../errors';
import {CassandraRepository} from '../repositories/CassandraRepository';
import {CassandraDatabase} from "../../db/cassandra/CassandraDatabase";

export class CassandraService {
  private readonly repo: CassandraRepository;

  constructor() {
    this.repo = new CassandraRepository();
  }

  /**
   * 1. Clear database
   * 2. Add objects in loop
   * @param allInstances
   * @param quantity
   */
  async createMany(allInstances: ParentI[], quantity: number) {
    await CassandraDatabase.getInstance().clearDB();

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .catch(() => new CreateErr('Cassandra CREATE in createMany() failed.'));
    }

    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
      await this.repo.createOne(allInstances[i])
        .catch(() => new CreateErr('Cassandra CREATE in createMany() failed.'));
    }
    return (time.elapsed());
  }

  /**
   * 1. Clear database
   * 2. Create given objects to database
   * 3. Save their id's
   * 4. Start timer and read all objects
   * 5. Stop timer
   * @param allInstances
   * @param quantity
   */
  async readMany(allInstances: ParentI[], quantity: number) {
    await CassandraDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .then(() => idArray.push(allInstances[i].parentId))
        .catch(() => new CreateErr('Cassandra CREATE in readMany() failed.'));
    }

    //  then read
    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
      await this.repo.readOne(idArray[i])
        .catch(() => new ReadErr('Cassandra READ_ONE in readMany() failed.'));
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
    await CassandraDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .then(() => idArray.push(allInstances[i].parentId))
        .catch(() => new CreateErr('Cassandra CREATE in updateMany() failed.'));
    }

    // then update
    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
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
   * @param allInstances
   * @param quantity
   */
  async deleteMany(allInstances: ParentI[], quantity: number) {
    await CassandraDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .then(() => idArray.push(allInstances[i].parentId))
        .catch(() => new CreateErr('Cassandra CREATE in deleteMany() failed.'));
    }

    // then delete
    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
      await this.repo.deleteOne(idArray[i])
        .catch(() => new DeleteErr('Cassandra DELETE in deleteMany() failed.'));
    }

    return (time.elapsed());
  }
}
