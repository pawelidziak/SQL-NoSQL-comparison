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
   * @param req
   */
  async createMany(allInstances: ParentI[], req: RequestModel) {
    await PostgreDatabase.getInstance().clearDB();

    // create first
    await this.repo.createManyParents(allInstances.slice(0, req.dbSize))
      .catch(() => new CreateErr('PostgreSQL CREATE in createMany() failed.'));

    const time = new Benchmark();
    await this.repo.createManyParents(allInstances.slice(req.dbSize))
      .catch(() => new CreateErr('PostgreSQL CREATE in createMany() failed.'));

    return (time.elapsed());
  }

  async readNoIndexes(parents: ParentI[], children: any[], req: RequestModel) {
    await PostgreDatabase.getInstance().clearDB();
    await this.repo.dropIndexes();
    return this.read(parents, children, req);
  }

  async readWithIndexes(parents: ParentI[], children: any[], req: RequestModel) {
    await PostgreDatabase.getInstance().clearDB();
    return this.read(parents, children, req);
  }

  /**
   * 1. Create given objects in database
   * 2. Start timer and read all objects
   * 3. Stop timer
   * @param parents
   * @param children
   * @param req
   */
  private async read(parents: ParentI[], children: any[], req: RequestModel) {
    await this.repo.createManyParents(parents.slice(0, req.dbSize / 2))
      .catch(() => new CreateErr('PostgreSQL CREATE in readNoIndexes() failed.'));
    await this.repo.createManyChildren(children.slice(0, req.dbSize / 2))
      .catch(() => new CreateErr('PostgreSQL CREATE in readNoIndexes() failed.'));

    const time = new Benchmark();
    for (let i = 0; i < req.quantity; i++) {
      await this.repo.readOne(`Child ${i + 1}`)
        .catch(() => new ReadErr('PostgreSQL READ in readNoIndexes() failed.'));
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
   * @param req
   */
  async updateMany(allInstances: ParentI[], req: RequestModel) {
    await PostgreDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < req.dbSize + req.quantity; i++) {
      await this.repo.createOneParent(allInstances[i])
        .then(data => idArray.push(data.parentid))
        .catch(() => new CreateErr('PostgreSQL CREATE in updateMany() failed.'));
    }

    // then update
    const time = new Benchmark();
    for (let i = 0; i < req.quantity; i++) {
      await this.repo.updateOneParent(idArray[i], `Updated ${i + 1}`)
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
   * @param req
   */
  async deleteMany(allInstances: ParentI[], req: RequestModel) {
    await PostgreDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < req.dbSize + req.quantity; i++) {
      await this.repo.createOneParent(allInstances[i])
        .then(data => idArray.push(data.parentid))
        .catch(
          () => new CreateErr('PostgreSQL CREATE in deleteMany() failed.'));
    }

    // then delete
    const time = new Benchmark();
    for (let i = 0; i < req.quantity; i++) {
      await this.repo.deleteOneParent(idArray[i])
        .catch(
          () => new DeleteErr('PostgreSQL DELETE in deleteMany() failed.'));
    }

    return (time.elapsed());
  }
}
