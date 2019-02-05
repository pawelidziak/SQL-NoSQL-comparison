import {ParentModel} from '../models/ParentModel';

export interface ParentService {
  getAllParents(): ParentModel[];
  getOneParent(id: string): ParentModel;
  createParent(model: ParentModel): void;
  updateParent(model: ParentModel): void;
}