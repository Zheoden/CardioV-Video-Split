import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../utils/baseEntity';
import { Media } from './media';

@Entity('media_media')
export class MediaMedia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'media_id' })
  mediaId?: string;

  @Column({ default: null, nullable: true })
  thumbnail?: string;

  @Column({ default: null, nullable: true })
  title?: string;

  @ManyToOne(() => Media, media => media.media, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'media_id' })
  media?: Media;
}
