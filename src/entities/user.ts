import { Entity, PrimaryColumn, Column, OneToMany, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../common/baseEntity';
import { Media } from './media';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'first_name' })
  firstName?: string;

  @Column({ name: 'last_name' })
  lastName?: string;

  @Column()
  birthdate?: string;

  @Column()
  avatar?: string;

  @OneToMany(() => Media, media => media.user, { cascade: true })
  portfolio?: Media[];
}
