import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estados_civis')
export class EstadoCivil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;
}
