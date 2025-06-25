import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DataBaseException } from 'src/shared/exceptions/database.exception';
import { GenericException } from 'src/shared/exceptions/generic.exception';
import { Result, Severity } from 'src/shared/models/result.model';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { UpdateEstadoCivilDto } from './dto/update-estado-civil.dto';
import { EstadosCivisService } from './estados-civis.service';

@Controller('estados-civis')
export class EstadosCivisController {
  constructor(private readonly estadosCivisService: EstadosCivisService) {}

  @Post()
  async create(@Body() createEstadoCivilDto: CreateEstadoCivilDto) {
    try {
      const estadoCivil =
        await this.estadosCivisService.create(createEstadoCivilDto);

      return new Result(
        Severity.Success,
        'Estado Civil salvo com sucesso!',
        estadoCivil,
      );
    } catch (error) {
      throw new DataBaseException(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEstadoCivilDto: UpdateEstadoCivilDto,
  ) {
    try {
      const estadoCivil = await this.estadosCivisService.update(
        id,
        updateEstadoCivilDto,
      );

      return new Result(
        Severity.Success,
        'Estado Civil salvo com sucesso!',
        estadoCivil,
      );
    } catch (error: unknown) {
      throw new DataBaseException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      if (await this.estadosCivisService.remove(id)) {
        return new Result(
          Severity.Success,
          'Estado Civil excluído com sucesso!',
        );
      } else {
        throw new GenericException('Registro não encontrado');
      }
    } catch (error) {
      throw new DataBaseException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.estadosCivisService.findAll();
    } catch (error) {
      throw new DataBaseException(error);
    }
  }
}
