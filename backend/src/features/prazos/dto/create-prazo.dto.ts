import { IsNotEmpty } from 'class-validator';

export class CreatePrazoDto {
  @IsNotEmpty({ message: 'O campo meses é obrigatório' })
  meses: number;
}
