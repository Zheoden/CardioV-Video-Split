import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('metrics')
export class MetricsView {
  @ViewColumn()
  male_avg_volume: number;

  @ViewColumn()
  female_avg_volume: number;

  @ViewColumn()
  child_avg_volume: number;

  @ViewColumn()
  teen_avg_volume: number;

  @ViewColumn()
  young_adult_avg_volume: number;

  @ViewColumn()
  adult_avg_volume: number;

  @ViewColumn()
  old_avg_volume: number;

  @ViewColumn()
  male_avg_walls: number;

  @ViewColumn()
  female_avg_walls: number;

  @ViewColumn()
  child_avg_walls: number;

  @ViewColumn()
  teen_avg_walls: number;

  @ViewColumn()
  young_adult_avg_walls: number;

  @ViewColumn()
  adult_avg_walls: number;

  @ViewColumn()
  old_avg_walls: number;

  @ViewColumn()
  male_avg_ventricle_area: number;

  @ViewColumn()
  female_ventricle_area: number;

  @ViewColumn()
  child_ventricle_area: number;

  @ViewColumn()
  teen_ventricle_area: number;

  @ViewColumn()
  young_adult_ventricle_area: number;

  @ViewColumn()
  adult_ventricle_area: number;

  @ViewColumn()
  old_ventricle_area: number;
}
