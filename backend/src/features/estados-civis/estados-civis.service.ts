import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/shared/models/record.model';
import { Repository } from 'typeorm';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { UpdateEstadoCivilDto } from './dto/update-estado-civil.dto';
import { EstadoCivil } from './entities/estado-civil.entity';

@Injectable()
export class EstadosCivisService {
  constructor(
    @InjectRepository(EstadoCivil)
    private estadosCivisRepository: Repository<EstadoCivil>,
  ) {}

  async create(
    createEstadoCivilDto: CreateEstadoCivilDto,
  ): Promise<EstadoCivil> {
    let estadoCivil = new EstadoCivil();
    estadoCivil.createdBy = 'createdBy';
    estadoCivil.updatedBy = 'updatedBy';
    estadoCivil.descricao = createEstadoCivilDto.descricao;

    estadoCivil = await this.estadosCivisRepository.save(estadoCivil);

    return estadoCivil;
  }

  async update(
    id: number,
    updateEstadoCivilDto: UpdateEstadoCivilDto,
  ): Promise<EstadoCivil> {
    await this.estadosCivisRepository.update(id, updateEstadoCivilDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.estadosCivisRepository.update(id, {
      deletedBy: 'deletedBy',
      deletedAt: new Date(),
    });

    return (result.affected ?? 0) > 0 ? true : false;
  }

  async findOne(id: number): Promise<EstadoCivil> {
    const estadoCivil = await this.estadosCivisRepository.findOneBy({ id });

    if (!estadoCivil) {
      throw new Error('Estado Civil não encontrado');
    }

    return estadoCivil;
  }

  async findAll(): Promise<Record<EstadoCivil>> {
    const [data, total] = await this.estadosCivisRepository.findAndCount({
      order: {
        descricao: 'ASC',
      },
    });

    return new Record<EstadoCivil>({
      data,
      total,
    });
  }
}
