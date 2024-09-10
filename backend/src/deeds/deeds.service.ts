// src/gooddeeds/gooddeeds.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodDeed } from './deed.entity';
import { User } from '../users/user.entity';

@Injectable()
export class GoodDeedsService {
  constructor(
    @InjectRepository(GoodDeed)
    private readonly goodDeedsRepository: Repository<GoodDeed>,
  ) {}

  async findAllByUser(user: User): Promise<GoodDeed[]> {
    return this.goodDeedsRepository.find({ where: { user } });
  }

  async create(deedData: Partial<GoodDeed>, user: User): Promise<GoodDeed> {
    const deed = this.goodDeedsRepository.create({ ...deedData, user });
    return this.goodDeedsRepository.save(deed);
  }

  async update(id: number, deedData: Partial<GoodDeed>, user: User): Promise<GoodDeed> {
    const deed = await this.goodDeedsRepository.findOne({ where: { id, user } });
    if (!deed) {
      throw new NotFoundException('Deed not found');
    }
    Object.assign(deed, deedData);
    return this.goodDeedsRepository.save(deed);
  }

  async delete(id: number, user: User): Promise<void> {
    const deed = await this.goodDeedsRepository.findOne({ where: { id, user } });
    if (!deed) {
      throw new NotFoundException('Deed not found');
    }
    await this.goodDeedsRepository.delete(id);
  }
}
