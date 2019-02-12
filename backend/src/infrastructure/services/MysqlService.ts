import {ParentI} from '../../core/models/ParentModel';
import {MysqlDatabase} from '../../db/mysql/MysqlDatabase';
import {Benchmark} from '../../utils/Benchmark';
import {CreateErr} from '../errors/CreateErr';
import {ReadErr} from '../errors/ReadErr';
import {MysqlRepository} from '../repositories/MysqlRepository';

export class MysqlService {
  private repo: MysqlRepository;

  constructor() {
    this.repo = new MysqlRepository();
  }

  /**
   * 1. Clear database
   * 2. Add children and measure time
   * @param parentModels
   */
  async createMany(parentModels: ParentI[]) {
    await MysqlDatabase.getInstance().clearDbAndCreateTables();
    const time = new Benchmark();

    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOneParent(parentModels[i])
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
   * @param parentModels - objects to read
   */
  async readMany(parentModels: ParentI[]) {
    await MysqlDatabase.getInstance().clearDbAndCreateTables();
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOneParent(parentModels[i])
          .then(res => idArray.push(res.insertId))
          .catch(() => new CreateErr('MySQL CREATE in createMany() failed.'));
    }

    // then read
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      await this.repo.readOneParent(idArray[i])
          .catch(() => new ReadErr('MySQL READ in readMany() failed.'));
    }

    return (time.elapsed());
  }
}
