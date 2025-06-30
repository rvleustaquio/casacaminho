import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/shared/models/record.model';
import { Repository } from 'typeorm';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Servico } from './entities/servicos.entity';

@Injectable()
export class ServicosService {
  constructor(
    @InjectRepository(Servico)
    private servicosRepository: Repository<Servico>,
  ) {}

  async create(createServicoDto: CreateServicoDto): Promise<Servico> {
    let servico = new Servico();
    servico.createdBy = 'createdBy';
    servico.updatedBy = 'updatedBy';
    servico.descricao = createServicoDto.descricao;

    servico = await this.servicosRepository.save(servico);

    return servico;
  }

  async update(
    id: number,
    updateServicoDto: UpdateServicoDto,
  ): Promise<Servico> {
    await this.servicosRepository.update(id, updateServicoDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.servicosRepository.update(id, {
      deletedBy: 'deletedBy',
      deletedAt: new Date(),
    });

    return (result.affected ?? 0) > 0 ? true : false;
  }

  async findOne(id: number): Promise<Servico> {
    const servico = await this.servicosRepository.findOneBy({ id });

    if (!servico) {
      throw new Error('Situação do Assistido não encontrada');
    }

    return servico;
  }

  async findAll(): Promise<Record<Servico>> {
    const [data, total] = await this.servicosRepository.findAndCount({
      order: {
        descricao: 'ASC',
      },
    });

    return new Record<Servico>({
      data,
      total,
    });
  }
}
