import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/shared/models/record.model';
import { Repository } from 'typeorm';
import { CreateSitAssistidoDto } from './dto/create-sit-assistido.dto';
import { UpdateSitAssistidoDto } from './dto/update-sit-assistido.dto';
import { SitAssistido } from './entities/sit-assistido.entity';

@Injectable()
export class SitAssistidosService {
  constructor(
    @InjectRepository(SitAssistido)
    private sitAssistidosRepository: Repository<SitAssistido>,
  ) {}

  async create(
    createSitAssistidoDto: CreateSitAssistidoDto,
  ): Promise<SitAssistido> {
    let sitAssistido = new SitAssistido();
    sitAssistido.createdBy = 'createdBy';
    sitAssistido.updatedBy = 'updatedBy';
    sitAssistido.descricao = createSitAssistidoDto.descricao;

    sitAssistido = await this.sitAssistidosRepository.save(sitAssistido);

    return sitAssistido;
  }

  async update(
    id: number,
    updateSitAssistidoDto: UpdateSitAssistidoDto,
  ): Promise<SitAssistido> {
    await this.sitAssistidosRepository.update(id, updateSitAssistidoDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.sitAssistidosRepository.update(id, {
      deletedBy: 'deletedBy',
      deletedAt: new Date(),
    });

    return (result.affected ?? 0) > 0 ? true : false;
  }

  async findOne(id: number): Promise<SitAssistido> {
    const sitAssistido = await this.sitAssistidosRepository.findOneBy({ id });

    if (!sitAssistido) {
      throw new Error('Situação do Assistido não encontrada');
    }

    return sitAssistido;
  }

  async findAll(): Promise<Record<SitAssistido>> {
    const [data, total] = await this.sitAssistidosRepository.findAndCount({
      order: {
        descricao: 'ASC',
      },
    });

    return new Record<SitAssistido>({
      data,
      total,
    });
  }
}
