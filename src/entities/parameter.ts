import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../utils/baseEntity';
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

  @Column()
  unit?: string;

  @ManyToOne(() => Media, media => media.parameters, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: "media_id"})
  media?: Media;
}
