import { Column, BaseEntity as BaseEntityTypeORM, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class BaseEntity extends BaseEntityTypeORM {
  @Column({ name: 'created_at' })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: string;
}
