import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/shared/models/record.model';
import { Repository } from 'typeorm';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';
import { Prazo } from './entities/prazo.entity';

@Injectable()
export class PrazosService {
  constructor(
    @InjectRepository(Prazo)
    private prazosRepository: Repository<Prazo>,
  ) {}

  async create(createPrazoDto: CreatePrazoDto): Promise<Prazo> {
    let prazo = new Prazo();
    prazo.createdBy = 'createdBy';
    prazo.updatedBy = 'updatedBy';
    prazo.meses = createPrazoDto.meses;

    prazo = await this.prazosRepository.save(prazo);

    return prazo;
  }

  async update(id: number, updatePrazoDto: UpdatePrazoDto): Promise<Prazo> {
    await this.prazosRepository.update(id, updatePrazoDto);

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.prazosRepository.update(id, {
      deletedBy: 'deletedBy',
      deletedAt: new Date(),
    });

    return (result.affected ?? 0) > 0 ? true : false;
  }

  async findOne(id: number): Promise<Prazo> {
    const prazo = await this.prazosRepository.findOneBy({ id });

    if (!prazo) {
      throw new Error('Situação do Assistido não encontrada');
    }

    return prazo;
  }

  async findAll(): Promise<Record<Prazo>> {
    const [data, total] = await this.prazosRepository.findAndCount({
      order: {
        meses: 'ASC',
      },
    });

    return new Record<Prazo>({
      data,
      total,
    });
  }
}
