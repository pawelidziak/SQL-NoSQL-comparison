import {ParentModel} from '../../core/models/ParentModel';
import {ParentRepository} from '../../core/repositories/ParentRepository';

export class ParentRepositoryImpl implements ParentRepository {
  constructor() {}

  getAll(): ParentModel[] {
    return TMP_DATA;
  }

  getOne(id: string): ParentModel {
    const index = this.findIndex(id);
    if (index === -1) {
      throw new Error('TODO getOne error');
    }
    return TMP_DATA[index];
  }

  addOne(model: ParentModel): void {
    // TMP_DATA.push(model);
    throw new Error('TODO getOne error');
  }

  updateOne(model: ParentModel): void {
    const index = this.findIndex(model.id);
    if (index === -1) {
      throw new Error('TODO getOne error');
    }
    TMP_DATA[index] = model;
  }

  private findIndex(id: string): number {
    return TMP_DATA.findIndex(x => x.id === id);
  }
}

const TMP_DATA: ParentModel[] = [
  {
    id: 'id1',
    name: 'Name 1',
    desc: 'Desc 1',
    tags: ['tag1', 'tag2'],
    childIds: ['childId1', 'childId2']
  },
  {
    id: 'id2',
    name: 'Name 2',
    desc: 'Desc 2',
    tags: ['tag1', 'tag2'],
    childIds: ['childId1', 'childId2']
  },
  {
    id: 'id3',
    name: 'Name 3',
    desc: 'Desc 3',
    tags: ['tag1', 'tag2'],
    childIds: ['childId1', 'childId2']
  },
  {
    id: 'id4',
    name: 'Name 4',
    desc: 'Desc 4',
    tags: ['tag1', 'tag2'],
    childIds: ['childId1', 'childId2']
  },
];