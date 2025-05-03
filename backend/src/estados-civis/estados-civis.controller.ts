import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { UpdateEstadoCivilDto } from './dto/update-estado-civil.dto';
import { EstadosCivisService } from './estados-civis.service';

@Controller('estados-civis')
export class EstadosCivisController {
  constructor(private readonly estadosCivisService: EstadosCivisService) {}

  @Post()
  create(@Body() createEstadoCivilDto: CreateEstadoCivilDto) {
    return this.estadosCivisService.create(createEstadoCivilDto);
  }

  @Get()
  findAll() {
    return this.estadosCivisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosCivisService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstadoCivilDto: UpdateEstadoCivilDto,
  ) {
    return this.estadosCivisService.update(+id, updateEstadoCivilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosCivisService.remove(+id);
  }
}
