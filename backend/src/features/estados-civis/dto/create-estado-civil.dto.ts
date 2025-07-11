import { IsNotEmpty } from 'class-validator';

export class CreateEstadoCivilDto {
  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;
}
