import {DataModel, ExtendData} from '../core/models/DataModel';
import {RequestModel} from '../core/models/RequestModel';

export class GenerateData {
  static getData(requestModel: RequestModel): DataModel[] {
    if (requestModel.simpleQuery) {
      return this.getSimpleData(requestModel.quantity);
    } else {
      return this.getExtendData(requestModel.quantity);
    }
  }

  static getSimpleData(quantity: number): DataModel[] {
    const tmp: DataModel[] = [];
    for (let i = 0; i < quantity; i++) {
      tmp.push(new DataModel(`Name ${i}`, i));
    }
    return tmp;
  }

  static getExtendData(quantity: number): ExtendData[] {
    const tmp: ExtendData[] = [];
    for (let i = 0; i < quantity; i++) {
      tmp.push(new ExtendData(`Name ${i}`, i, [`Tag${i}`, `Tag${i + 1}`]));
    }
    return tmp;
  }
}
