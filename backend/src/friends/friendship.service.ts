import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friendship } from './friendship.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,

    @InjectRepository(User)  // Inject UserRepository
    private userRepository: Repository<User>,
  ) {}

  async addFriend(user: User, friendId: number): Promise<Friendship> {
    const friend = await this.userRepository.findOne({ where: { id: friendId } });
    if (!friend) {
      throw new Error('Friend not found');
    }
    
    const friendship = this.friendshipRepository.create({ user, friend });
    return this.friendshipRepository.save(friendship);
  }

  async removeFriend(user: User, friendId: number): Promise<void> {
    await this.friendshipRepository.delete({ user, friend: { id: friendId } });
  }

  async getFriends(user: User): Promise<Friendship[]> {
    return this.friendshipRepository.find({ where: { user }, relations: ['friend'] });
  }
}
