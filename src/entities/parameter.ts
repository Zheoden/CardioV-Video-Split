import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Media } from './media';

@Entity('parameter')
export class Parameter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'media_id' })
  mediaId?: string;

  @Column()
  field?: string;

  @Column()
  value?: string;

  @ManyToOne(() => Media, media => media.parameters, { orphanedRowAction: 'delete' })
  media?: Media;
}
