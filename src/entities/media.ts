import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../utils/baseEntity';
import { MediaMedia } from './mediaMedia';
import { Parameter } from './parameter';
import { User } from './user';

@Entity('media')
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  title?: string;

  @Column()
  description?: string;

  @Column()
  patology?: string;

  @Column()
  scale?: number;

  @Column()
  thumbnail?: string;

  @Column({ name: 'user_id' })
  userId?: string;

  @OneToMany(() => Parameter, param => param.media, { cascade: true })
  parameters?: Parameter[];

  @OneToMany(() => MediaMedia, param => param.media, { cascade: true })
  media?: MediaMedia[];

  @ManyToOne(() => User, user => user.portfolio, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
