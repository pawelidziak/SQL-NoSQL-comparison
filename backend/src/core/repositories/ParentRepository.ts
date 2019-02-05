import {ParentModel} from '../models/ParentModel';

export interface ParentRepository {
  getAll(): ParentModel[];
  getOne(id: string): ParentModel;
  addOne(model: ParentModel): void;
  updateOne(model: ParentModel): void;
}