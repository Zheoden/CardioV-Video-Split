import { ParameterType } from "../common/interfaces";

export class ParameterDto {
  field?: ParameterType;
  value: string;
  unit: string;
  createdAt: string;
}
