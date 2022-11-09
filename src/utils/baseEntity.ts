import { CreateDateColumn, BaseEntity as BaseEntityTypeORM, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class BaseEntity extends BaseEntityTypeORM {
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: string;
}
