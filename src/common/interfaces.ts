export interface VideoProcessValue {
  atrium_area: number[];
  muscle_thickness: number[];
  ventricle_area: number[];
  ventricle_volume: number[];
}

export enum ParameterType {
  ATRIUM_AREA = 'ATRIUM_AREA',
  MUSCLE_THICKNESS = 'MUSCLE_THICKNESS',
  VENTRICLE_AREA = 'VENTRICLE_AREA',
  VENTRICLE_VOLUME = 'VENTRICLE_VOLUME',
}
