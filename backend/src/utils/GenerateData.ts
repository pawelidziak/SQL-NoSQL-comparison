import {ChildModel} from '../core/models/ChildModel';
import {ParentI} from '../core/models/ParentModel';
import {RequestModel} from '../core/models/RequestModel';

export class GenerateData {
  static getChildren(requestModel: RequestModel): ChildModel[] {
    const tmp: any[] = [];
    const max = requestModel.dbSize + requestModel.quantity;
    for (let i = 0; i < max; i++) {
      tmp.push({childId: `${i + 1}`, name: `Child ${i + 1}`, parentId: `${i + 1}`});
    }
    return tmp;
  }

  static getParents(requestModel: RequestModel): ParentI[] {
    const tmp: ParentI[] = [];
    const max = requestModel.dbSize + requestModel.quantity;
    for (let i = 0; i < max; i++) {
      tmp.push({parentId: `${i + 1}`, name: `Parent ${i + 1}`});
    }
    return tmp;
  }
}
