import {ParentModel} from '../../core/models/ParentModel';
import {ParentService} from '../../core/services/ParentService';
import {ParentRepositoryImpl} from '../repositories/ParentRepositoryImpl';

export class ParentServiceImpl implements ParentService {
  private parentRepo: ParentRepositoryImpl;

  constructor() {
    this.parentRepo = new ParentRepositoryImpl();
  }

  getAllParents(): ParentModel[] {
    return this.parentRepo.getAll();
  }

  getOneParent(id: string): ParentModel {
    return this.parentRepo.getOne(id);
  }

  createParent(model: ParentModel): void {
    this.parentRepo.addOne(model);
  }

  updateParent(model: ParentModel): void {
    this.parentRepo.updateOne(model);
  }
}