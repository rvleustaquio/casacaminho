import { PartialType } from '@nestjs/swagger';
import { CreatePrazoDto } from './create-prazo.dto';

export class UpdatePrazoDto extends PartialType(CreatePrazoDto) {}
