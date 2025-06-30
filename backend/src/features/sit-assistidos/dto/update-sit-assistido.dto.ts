import { PartialType } from '@nestjs/swagger';
import { CreateSitAssistidoDto } from './create-sit-assistido.dto';

export class UpdateSitAssistidoDto extends PartialType(CreateSitAssistidoDto) {}
