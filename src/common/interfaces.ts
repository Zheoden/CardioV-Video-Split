export interface VideoProcessValue {
  ventricle_perimeter: number[];
  muscle_thickness: number[];
  ventricle_area: number[];
  ventricle_volume: number[];
  media: string[];
}

export enum ParameterType {
  VENTRICLE_PERIMETER = 'VENTRICLE_PERIMETER',
  MUSCLE_THICKNESS = 'MUSCLE_THICKNESS',
  VENTRICLE_AREA = 'VENTRICLE_AREA',
  VENTRICLE_VOLUME = 'VENTRICLE_VOLUME',
  ATRIUM_AREA = 'ATRIUM_AREA',
  EJECTION_FRACTION = 'EJECTION_FRACTION',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
