import {ParentI} from '../../core/models/ParentModel';
import {PostgreDatabase} from '../../db/postgre/PostgreDatabase';
import {Benchmark} from '../../utils/Benchmark';
import {CreateErr, DeleteErr, ReadErr, UpdateErr} from '../errors';
import {PostgreRepository} from '../repositories/PostgreRepository';
import {RequestModel} from "../../core/models/RequestModel";

export class PostgreService {
  private readonly repo: PostgreRepository;

  constructor() {
    this.repo = new PostgreRepository();
  }

  /**
   * 1. Clear database
   * 2. Add objects in loop
   * @param allInstances
   * @param quantity
   */
  async createMany(allInstances: ParentI[], quantity: number) {
    await PostgreDatabase.getInstance().clearDB();

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .catch(() => new CreateErr('PostgreSQL CREATE in createMany() failed.'));
    }

    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
      await this.repo.createOne(allInstances[i])
        .catch(() => new CreateErr('PostgreSQL CREATE in createMany() failed.'));
    }
    return (time.elapsed());
  }

  /**
   * 1. Clear database
   * 2. Create given objects to database
   * 3. Save their id's
   * 4. Start timer and read all objects
   * 5. Stop timer
   * @param parents
   * @param children
   * @param req
   */
  async readMany(parents: ParentI[], children: any[], req: RequestModel) {
    await PostgreDatabase.getInstance().clearDB();
    const parentsIds: string[] = [];
    const childrenIds: string[] = [];

    // create first
    for (let i = 0; i < parents.length; i++) {
      await this.repo.createOne(parents[i])
        .then(data => parentsIds.push(data[0].parentid))
        .catch(() => new CreateErr('PostgreSQL CREATE in readMany() failed.'));
      if (!req.simpleQuery) {
        await this.repo.createOneChild(children[i])
          .then(data => childrenIds.push(data[0].childid))
          .catch(() => new CreateErr('PostgreSQL CREATE in readMany() failed.'));
      }
    }

    //  then read
    const time = new Benchmark();
    for (let i = 0; i < req.quantity; i++) {
      if (req.simpleQuery) {
        await this.repo.readOne(parentsIds[i])
          .then(res => console.log(res))
          .catch(() => new ReadErr('PostgreSQL READ_ONE in readMany() failed.'));
      } else {
        await this.repo.readOneComplex(childrenIds[i])
          .then(res => {
            console.log('no tutaj');
            console.log(res);
          })
          .catch(() => new ReadErr('PostgreSQL READ_ONE in readMany() failed.'));
      }
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
    await PostgreDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .then(data => idArray.push(data.parentid))
        .catch(
          () => new CreateErr('PostgreSQL CREATE in updateMany() failed.'));
    }

    // then update
    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
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
   * @param allInstances
   * @param quantity
   */
  async deleteMany(allInstances: ParentI[], quantity: number) {
    await PostgreDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOne(allInstances[i])
        .then(data => idArray.push(data.parentid))
        .catch(
          () => new CreateErr('PostgreSQL CREATE in deleteMany() failed.'));
    }

    // then delete
    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
      await this.repo.deleteOne(idArray[i])
        .catch(
          () => new DeleteErr('PostgreSQL DELETE in deleteMany() failed.'));
    }

    return (time.elapsed());
  }
}