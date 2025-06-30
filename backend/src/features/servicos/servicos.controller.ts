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
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { ServicosService } from './servicos.service';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Post()
  async create(@Body() createServicoDto: CreateServicoDto) {
    try {
      const servico = await this.servicosService.create(createServicoDto);

      return new Result(
        Severity.Success,
        'Serviço salvo com sucesso!',
        servico,
      );
    } catch (error) {
      throw new DataBaseException(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateServicoDto: UpdateServicoDto,
  ) {
    try {
      const servico = await this.servicosService.update(id, updateServicoDto);

      return new Result(
        Severity.Success,
        'Serviço salvo com sucesso!',
        servico,
      );
    } catch (error: unknown) {
      throw new DataBaseException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      if (await this.servicosService.remove(id)) {
        return new Result(Severity.Success, 'Serviço excluído com sucesso!');
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
      return await this.servicosService.findAll();
    } catch (error) {
      throw new DataBaseException(error);
    }
  }
}
