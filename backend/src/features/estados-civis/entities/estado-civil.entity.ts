import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'comum', name: 'estados_civis' })
export class EstadoCivil {
  @Column({ name: 'created_by' })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_by' })
  deletedBy: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;
}
