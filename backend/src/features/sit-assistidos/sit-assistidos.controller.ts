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
import { CreateSitAssistidoDto } from './dto/create-sit-assistido.dto';
import { UpdateSitAssistidoDto } from './dto/update-sit-assistido.dto';
import { SitAssistidosService } from './sit-assistidos.service';

@Controller('sit-assistidos')
export class SitAssistidosController {
  constructor(private readonly sitAssistidosService: SitAssistidosService) {}

  @Post()
  async create(@Body() createSitAssistidoDto: CreateSitAssistidoDto) {
    try {
      const sitAssistido = await this.sitAssistidosService.create(
        createSitAssistidoDto,
      );

      return new Result(
        Severity.Success,
        'Situação do Assistido salvo com sucesso!',
        sitAssistido,
      );
    } catch (error) {
      throw new DataBaseException(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSitAssistidoDto: UpdateSitAssistidoDto,
  ) {
    try {
      const sitAssistido = await this.sitAssistidosService.update(
        id,
        updateSitAssistidoDto,
      );

      return new Result(
        Severity.Success,
        'Situação do Assistido salvo com sucesso!',
        sitAssistido,
      );
    } catch (error: unknown) {
      throw new DataBaseException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      if (await this.sitAssistidosService.remove(id)) {
        return new Result(
          Severity.Success,
          'Situação do Assistido excluído com sucesso!',
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
      return await this.sitAssistidosService.findAll();
    } catch (error) {
      throw new DataBaseException(error);
    }
  }
}
