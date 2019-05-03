import {ChildModel} from '../core/models/ChildModel';
import {ParentI} from '../core/models/ParentModel';
import {RequestModel} from '../core/models/RequestModel';

export class GenerateData {
  static getChildren(requestModel: RequestModel): ChildModel[] {
    const tmp: any[] = [];
    for (let i = 0; i < requestModel.dbSize; i++) {
      tmp.push({childId: `${i + 1}`, name: `Question ${i + 1}`, parentId: `${i + 1}`});
    }
    return tmp;
  }

  static getParents(requestModel: RequestModel): ParentI[] {
    const tmp: ParentI[] = [];
    for (let i = 0; i < requestModel.dbSize; i++) {
      tmp.push({parentId: `${i + 1}`, name: `Name ${i + 1}`});
    }
    return tmp;
  }
}
