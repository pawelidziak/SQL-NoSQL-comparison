import {DataModel} from '../../core/models/DataModel';
import {Benchmark} from '../../utils/Benchmark';
import {MongoRepository} from '../repositories/MongoRepository';

export class MongoService {
  private repo: MongoRepository;

  constructor() {
    this.repo = new MongoRepository();
  }

  createMany(objList: DataModel[]) {
    const time = new Benchmark();

    for (let i = 0; i < objList.length; i++) {
      this.repo.createOne(objList[i]).catch(() => {
        throw new Error('Mongo create ERROR.');
      });
    }

    return (time.elapsed());
  }
}
