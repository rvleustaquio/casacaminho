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
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';
import { PrazosService } from './prazos.service';

@Controller('prazos')
export class PrazosController {
  constructor(private readonly prazosService: PrazosService) {}

  @Post()
  async create(@Body() createPrazoDto: CreatePrazoDto) {
    try {
      const prazo = await this.prazosService.create(createPrazoDto);

      return new Result(Severity.Success, 'Prazo salvo com sucesso!', prazo);
    } catch (error) {
      throw new DataBaseException(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePrazoDto: UpdatePrazoDto,
  ) {
    try {
      const prazo = await this.prazosService.update(id, updatePrazoDto);

      return new Result(Severity.Success, 'Prazo salvo com sucesso!', prazo);
    } catch (error: unknown) {
      throw new DataBaseException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      if (await this.prazosService.remove(id)) {
        return new Result(Severity.Success, 'Prazo excluído com sucesso!');
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
      return await this.prazosService.findAll();
    } catch (error) {
      throw new DataBaseException(error);
    }
  }
}
