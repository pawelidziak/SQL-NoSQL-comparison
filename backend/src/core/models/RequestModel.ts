import {OperationType} from "./OperationType";

export interface RequestModel {
  quantity: number;
  simpleQuery: boolean;
  operation: OperationType;
}
