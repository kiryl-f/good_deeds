import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deed } from './deed.entity';
import { User } from '../users/user.entity';

@Injectable()
export class DeedsService {
  constructor(
    @InjectRepository(Deed)
    private deedsRepository: Repository<Deed>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Deed[]> {
    return this.deedsRepository.find({ relations: ['user'] });
  }

  async findByUserId(userId: number): Promise<Deed[]> {
    return this.deedsRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async findLatestDeeds(): Promise<Deed[]> {
    return this.deedsRepository.find({
      order: { createdAt: 'DESC' },
      take: 3,
      relations: ['user'], 
    });
  }

  async create(title: string, description: string, userId: number): Promise<Deed> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const deed = this.deedsRepository.create({
      title,
      description,
      user,
    });

    return this.deedsRepository.save(deed);
  }
}
