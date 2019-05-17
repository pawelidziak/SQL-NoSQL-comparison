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
   * @param req
   */
  async createMany(allInstances: ParentI[], req: RequestModel) {
    await MysqlDatabase.getInstance().clearDB();

    // create first
    await this.repo.createManyParents(allInstances.slice(0, req.dbSize))
      .catch(() => new CreateErr('MySQL CREATE in createMany() failed.'));

    const time = new Benchmark();
    await this.repo.createManyParents(allInstances.slice(req.dbSize))
      .catch(() => new CreateErr('MySQL CREATE in createMany() failed.'));

    return (time.elapsed());
  }

  /**
   * 1. Clear database
   * 2. Create given objects in database
   * @param parents
   * @param children
   * @param req
   */
  private async beforeRead(parents: ParentI[], children: any[], req: RequestModel) {
    await MysqlDatabase.getInstance().clearDB();
    await this.repo.createManyParents(parents.slice(0, req.dbSize / 2))
      .catch(() => new CreateErr('MySQL CREATE in createManyParents() failed.'));
    await this.repo.createManyChildren(children.slice(0, req.dbSize / 2))
      .catch(() => new CreateErr('MySQL CREATE in createManyChildren() failed.'));
  }

  private async read(parents: ParentI[], children: any[], req: RequestModel) {
    await this.repo.createManyParents(parents.slice(0, req.dbSize / 2))
      .catch(() => new CreateErr('MySQL CREATE in readNoIndexes() failed.'));
    await this.repo.createManyChildren(children.slice(0, req.dbSize / 2))
      .catch(() => new CreateErr('MySQL CREATE in readNoIndexes() failed.'));

    const time = new Benchmark();
    for (let i = 0; i < req.quantity; i++) {
      await this.repo.readOne(`Child ${i + 1}`)
        .catch(() => new ReadErr('MySQL READ in readNoIndexes() failed.'));
    }
    return (time.elapsed());
  }

  async readNoIndexes(parents: ParentI[], children: any[], req: RequestModel) {
    await MysqlDatabase.getInstance().clearDB();
    await this.repo.dropIndexes();
    return this.read(parents, children, req);
  }

  async readWithIndexes(parents: ParentI[], children: any[], req: RequestModel) {
    await this.beforeRead(parents, children, req);

    const time = new Benchmark();
    for (let i = 0; i < req.quantity; i++) {
      await this.repo.readOneWithIndex(`Child ${i + 1}`)
        .catch(() => new ReadErr('MySQL READ in readNoIndexes() failed.'));
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
    await MysqlDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < req.dbSize + req.quantity; i++) {
      await this.repo.createOneParent(allInstances[i])
        .then(res => idArray.push(res.insertId))
        .catch(() => new CreateErr('MySQL CREATE in updateMany() failed.'));
    }

    // then update
    const time = new Benchmark();
    for (let i = 0; i < req.quantity; i++) {
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
   * @param req
   */
  async deleteMany(allInstances: ParentI[], req: RequestModel) {
    await MysqlDatabase.getInstance().clearDB();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < req.dbSize + req.quantity; i++) {
      await this.repo.createOneParent(allInstances[i])
        .then(res => idArray.push(res.insertId))
        .catch(() => new CreateErr('MySQL CREATE in deleteMany() failed.'));
    }

    // then delete
    const time = new Benchmark();
    for (let i = 0; i < req.quantity; i++) {
      await this.repo.deleteOneParents(idArray[i])
        .catch(() => new DeleteErr('MySQL DELETE in deleteMany() failed.'));
    }

    return (time.elapsed());
  }
}
