import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './entities/size.entity';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private sizesRepository: Repository<Size>,
  ) {}

  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    const size = this.sizesRepository.create(createSizeDto);
    return this.sizesRepository.save(size);
  }

  async findAll(): Promise<Size[]> {
    return this.sizesRepository.find({
      relations: ['productSizes', 'productSizes.product'],
    });
  }

  async findOne(id: number): Promise<Size> {
    const size = await this.sizesRepository.findOne({
      where: { id },
      relations: ['productSizes', 'productSizes.product'],
    });
    if (!size) {
      throw new NotFoundException(`Size with ID ${id} not found`);
    }
    return size;
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<Size> {
    const size = await this.findOne(id);
    Object.assign(size, updateSizeDto);
    return this.sizesRepository.save(size);
  }

  async remove(id: number): Promise<void> {
    const size = await this.findOne(id);
    await this.sizesRepository.remove(size);
  }
}
