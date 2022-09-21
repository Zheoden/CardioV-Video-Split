import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../config/baseEntity';
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

  @OneToMany(() => Parameter, param => param.media, { cascade: true })
  parameters?: Parameter[];

  @ManyToOne(() => User, user => user.portfolio, { orphanedRowAction: 'delete' })
  user?: User;
}
