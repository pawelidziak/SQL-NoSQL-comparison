import {PostgreRepository} from '../repositories/PostgreRepository';
import {ParentI} from "../../core/models/ParentModel";
import {Benchmark} from "../../utils/Benchmark";

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
    // clear db TODO
    const time = new Benchmark();

    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
        .catch((err) => console.log(err));
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
    // clear db TODO
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      await this.repo.createOne(parentModels[i])
        .then(data => idArray.push(data.parentid))
        .catch((err) => console.log(err));
    }

    //  then read
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      // connect to repo TODO
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
    // clear db TODO
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      // connect to repo TODO
    }

    // then update
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      // connect to repo TODO
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
    // clear db TODO
    const idArray: string[] = [];

    // create first
    for (let i = 0; i < parentModels.length; i++) {
      // connect to repo TODO
    }

    // then delete
    const time = new Benchmark();
    for (let i = 0; i < idArray.length; i++) {
      // connect to repo TODO
    }

    return (time.elapsed());
  }

}
