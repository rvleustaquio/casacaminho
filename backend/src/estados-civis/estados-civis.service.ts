import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const estadoCivil =
      this.estadosCivisRepository.create(createEstadoCivilDto);
    return this.estadosCivisRepository.save(estadoCivil);
  }

  async findAll(): Promise<EstadoCivil[]> {
    return this.estadosCivisRepository.find();
  }

  async findOne(id: number): Promise<EstadoCivil> {
    const estadoCivil = await this.estadosCivisRepository.findOneBy({ id });

    if (!estadoCivil) {
      throw new Error('Estado Civil não encontrado');
    }

    return estadoCivil;
  }

  async update(
    id: number,
    updateEstadoCivilDto: UpdateEstadoCivilDto,
  ): Promise<EstadoCivil> {
    await this.estadosCivisRepository.update(id, updateEstadoCivilDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.estadosCivisRepository.delete(id);
  }
}
