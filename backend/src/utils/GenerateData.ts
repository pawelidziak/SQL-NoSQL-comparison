import {ChildModel} from '../core/models/ChildModel';
import {ParentI} from '../core/models/ParentModel';
import {RequestModel} from '../core/models/RequestModel';

export class GenerateData {
  static getChildren(requestModel: RequestModel): ChildModel[] {
    const tmp: ChildModel[] = [];
    for (let i = 0; i < requestModel.quantity; i++) {
      tmp.push(new ChildModel(`${i}`, `Question ${i}`, `${i}`));
    }
    return tmp;
  }

  static getParents(requestModel: RequestModel): ParentI[] {
    const tmp: ParentI[] = [];
    for (let i = 0; i < requestModel.quantity; i++) {
      tmp.push({name: `Name ${i + 1}`});
    }
    return tmp;
  }
}
