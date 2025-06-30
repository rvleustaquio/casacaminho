import { IsNotEmpty } from 'class-validator';

export class CreateSitAssistidoDto {
  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;
}
