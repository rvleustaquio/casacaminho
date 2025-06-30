import { IsNotEmpty } from 'class-validator';

export class CreateServicoDto {
  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;
}
