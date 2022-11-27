import { Entity, PrimaryColumn, Column, OneToMany, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../utils/baseEntity';
import { Media } from './media';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'first_name', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  birthdate?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  email?: string;

  @OneToMany(() => Media, media => media.user, { cascade: true })
  portfolio?: Media[];
}
