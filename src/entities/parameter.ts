import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ParameterType } from '../common/interfaces';
import { BaseEntity } from '../utils/baseEntity';
import { Media } from './media';

@Entity('parameter')
export class Parameter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'media_id' })
  mediaId?: string;

  @Column({ type: 'enum', enum: ParameterType, default: null, nullable: true })
  field?: ParameterType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value?: number;

  @Column()
  unit?: string;

  @ManyToOne(() => Media, media => media.parameters, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'media_id' })
  media?: Media;
}
