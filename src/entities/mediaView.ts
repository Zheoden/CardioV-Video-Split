import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('metrics', {
  expression: `select ROUND(nvl(SUM(case when m.gender = 'MALE' and p.field = 'VENTRICLE_VOLUME' then p.value else 0 end) / SUM(case when m.gender = 'MALE' and p.field = 'VENTRICLE_VOLUME' then 1 else 0 end),0), 2) as male_avg_volume, ROUND(nvl(SUM(case when m.gender = 'FEMALE' and p.field = 'VENTRICLE_VOLUME' then p.value else 0 end) / SUM( case when m.gender = 'FEMALE' and p.field = 'VENTRICLE_VOLUME' then 1 else 0 end),0), 2) as female_avg_volume, ROUND(nvl(SUM(case when m.age between 0 and 13 and p.field = 'VENTRICLE_VOLUME' then p.value else 0 end) / SUM( case when m.age between 0 and 13 and p.field = 'VENTRICLE_VOLUME' then 1 else 0 end),0), 2) as child_avg_volume, ROUND(nvl(SUM(case when m.age between 14 and 20 and p.field = 'VENTRICLE_VOLUME' then p.value else 0 end) / SUM( case when m.age between 14 and 20 and p.field = 'VENTRICLE_VOLUME' then 1 else 0 end),0), 2) as teen_avg_volume, ROUND(nvl(SUM(case when m.age between 21 and 40 and p.field = 'VENTRICLE_VOLUME' then p.value else 0 end) / SUM( case when m.age between 21 and 40 and p.field = 'VENTRICLE_VOLUME' then 1 else 0 end),0), 2) as young_adult_avg_volume, ROUND(nvl(SUM(case when m.age between 41 and 60 and p.field = 'VENTRICLE_VOLUME' then p.value else 0 end) / SUM( case when m.age between 41 and 60 and p.field = 'VENTRICLE_VOLUME' then 1 else 0 end),0), 2) as adult_avg_volume, ROUND(nvl(SUM(case when m.age >= 61 and p.field = 'VENTRICLE_VOLUME' then p.value else 0 end) / SUM( case when m.age >= 61 and p.field = 'VENTRICLE_VOLUME'then 1 else 0 end),0), 2) as old_avg_volume, ROUND(nvl(SUM(case when m.gender = 'MALE' and p.field = 'MUSCLE_THICKNESS' then p.value else 0 end) / SUM(case when m.gender = 'MALE' and p.field = 'MUSCLE_THICKNESS' then 1 else 0 end),0), 2) as male_avg_walls, ROUND(nvl(SUM(case when m.gender = 'FEMALE' and p.field = 'MUSCLE_THICKNESS' then p.value else 0 end) / SUM( case when m.gender = 'FEMALE' and p.field = 'MUSCLE_THICKNESS' then 1 else 0 end),0), 2) as female_avg_walls, ROUND(nvl(SUM(case when m.age between 0 and 13 and p.field = 'MUSCLE_THICKNESS' then p.value else 0 end) / SUM( case when m.age between 0 and 13 and p.field = 'MUSCLE_THICKNESS' then 1 else 0 end),0), 2) as child_avg_walls, ROUND(nvl(SUM(case when m.age between 14 and 20 and p.field = 'MUSCLE_THICKNESS' then p.value else 0 end) / SUM( case when m.age between 14 and 20 and p.field = 'MUSCLE_THICKNESS' then 1 else 0 end),0), 2) as teen_avg_walls, ROUND(nvl(SUM(case when m.age between 21 and 40 and p.field = 'MUSCLE_THICKNESS' then p.value else 0 end) / SUM( case when m.age between 21 and 40 and p.field = 'MUSCLE_THICKNESS' then 1 else 0 end),0), 2) as young_adult_avg_walls, ROUND(nvl(SUM(case when m.age between 41 and 60 and p.field = 'MUSCLE_THICKNESS' then p.value else 0 end) / SUM( case when m.age between 41 and 60 and p.field = 'MUSCLE_THICKNESS' then 1 else 0 end),0), 2) as adult_avg_walls, ROUND(nvl(SUM(case when m.age >= 61 and p.field = 'MUSCLE_THICKNESS' then p.value else 0 end) / SUM( case when m.age >= 61 and p.field = 'MUSCLE_THICKNESS'then 1 else 0 end),0), 2) as old_avg_walls, ROUND(nvl(SUM(case when m.gender = 'MALE' and p.field = 'VENTRICLE_AREA' then p.value else 0 end) / SUM(case when m.gender = 'MALE' and p.field = 'VENTRICLE_AREA' then 1 else 0 end),0), 2) as male_avg_ventricle_area, ROUND(nvl(SUM(case when m.gender = 'FEMALE' and p.field = 'VENTRICLE_AREA' then p.value else 0 end) / SUM( case when m.gender = 'FEMALE' and p.field = 'VENTRICLE_AREA' then 1 else 0 end),0), 2) as female_ventricle_area, ROUND(nvl(SUM(case when m.age between 0 and 13 and p.field = 'VENTRICLE_AREA' then p.value else 0 end) / SUM( case when m.age between 0 and 13 and p.field = 'VENTRICLE_AREA' then 1 else 0 end),0), 2) as child_ventricle_area, ROUND(nvl(SUM(case when m.age between 14 and 20 and p.field = 'VENTRICLE_AREA' then p.value else 0 end) / SUM( case when m.age between 14 and 20 and p.field = 'VENTRICLE_AREA' then 1 else 0 end),0), 2) as teen_ventricle_area, ROUND(nvl(SUM(case when m.age between 21 and 40 and p.field = 'VENTRICLE_AREA' then p.value else 0 end) / SUM( case when m.age between 21 and 40 and p.field = 'VENTRICLE_AREA' then 1 else 0 end),0), 2) as young_adult_ventricle_area, ROUND(nvl(SUM(case when m.age between 41 and 60 and p.field = 'VENTRICLE_AREA' then p.value else 0 end) / SUM( case when m.age between 41 and 60 and p.field = 'VENTRICLE_AREA' then 1 else 0 end),0), 2) as adult_ventricle_area, ROUND(nvl(SUM(case when m.age >= 61 and p.field = 'VENTRICLE_AREA' then p.value else 0 end) / SUM( case when m.age >= 61 and p.field = 'VENTRICLE_AREA'then 1 else 0 end),0), 2) as old_ventricle_area from media m join parameter p on m.id = p.media_id where m.deleted_at is null`,
})
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
