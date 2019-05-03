import {ParentI} from '../../core/models/ParentModel';
import {MysqlDatabase} from '../../db/mysql/MysqlDatabase';
import {Benchmark} from '../../utils/Benchmark';
import {CreateErr, DeleteErr, ReadErr, UpdateErr} from '../errors';
import {MysqlRepository} from '../repositories/MysqlRepository';
import {RequestModel} from "../../core/models/RequestModel";

export class MysqlService {
  private repo: MysqlRepository;

  constructor() {
    this.repo = new MysqlRepository();
  }

  /**
   * 1. Clear database
   * 2. Add children and measure time
   * @param allInstances
   * @param quantity
   */
  async createMany(allInstances: ParentI[], quantity: number) {
    await MysqlDatabase.getInstance().clearDB();
    const time = new Benchmark();

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOneParent(allInstances[i])
        .catch(() => new CreateErr('MySQL CREATE in createMany() failed.'));
    }

    for (let i = 0; i < quantity; i++) {
      await this.repo.createOneParent(allInstances[i])
        .catch(() => new CreateErr('MySQL CREATE in createMany() failed.'));
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
   * @param readAsAll
   */
  async readMany(parents: ParentI[], children: any[], req: RequestModel, readAsAll: boolean) {
    await MysqlDatabase.getInstance().clearDB();
    const parentsIds: string[] = [];
    const childrenIds: string[] = [];

    // create first
    for (let i = 0; i < parents.length; i++) {
      await this.repo.createOneParent(parents[i])
        .then(res => parentsIds.push(res.insertId))
        .catch(() => new CreateErr('MySQL CREATE in readMany() failed.'));
      if (!req.simpleQuery) {
        await this.repo.createOneChild(children[i])
          .then(res => childrenIds.push(res.insertId))
          .catch(() => new CreateErr('MySQL CREATE in readMany() failed.'));
      }
    }

    // then read
    const time = new Benchmark();

    if (readAsAll) {
      if (req.simpleQuery) {
        await this.repo.readAll()
          .catch(() => new ReadErr('MySQL READ_ONE in readMany() failed.'));
      } else {
        await this.repo.readAllComplex()
          .catch(() => new ReadErr('MySQL READ_ONE in readMany() failed.'));
      }
      return (time.elapsed());
    }

    for (let i = 0; i < req.quantity; i++) {
      if (req.simpleQuery) {
        await this.repo.readOne(parentsIds[i])
          .catch(() => new ReadErr('MySQL READ_ONE in readMany() failed.'));
      } else {
        await this.repo.readOneComplex(childrenIds[i])
          .catch(() => new ReadErr('MySQL READ_ONE in readMany() failed.'));
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
    await MysqlDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOneParent(allInstances[i])
        .then(res => idArray.push(res.insertId))
        .catch(() => new CreateErr('MySQL CREATE in updateMany() failed.'));
    }

    // then update
    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
      await this.repo.updateOneParent(idArray[i], `Updated ${i + 1}`)
        .catch(() => new UpdateErr('MySQL UPDATE in updateMany() failed.'));
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
    await MysqlDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < allInstances.length; i++) {
      await this.repo.createOneParent(allInstances[i])
        .then(res => idArray.push(res.insertId))
        .catch(() => new CreateErr('MySQL CREATE in deleteMany() failed.'));
    }

    // then delete
    const time = new Benchmark();
    for (let i = 0; i < quantity; i++) {
      await this.repo.deleteOneParents(idArray[i])
        .catch(() => new DeleteErr('MySQL DELETE in deleteMany() failed.'));
    }

    return (time.elapsed());
  }
}
