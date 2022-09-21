import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../utils/baseEntity';
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
  thumbnail?: string;

  @Column({ name: 'user_id' })
  userId?: string;

  @OneToMany(() => Parameter, param => param.media, { cascade: true, eager: true })
  parameters?: Parameter[];

  @ManyToOne(() => User, user => user.portfolio, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
