import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findByUsername(username: string): Promise<User | undefined> {
    console.log('trying to find user ', username, ' resulting in ' + this.userRepository.findOne({ where: { username } }));
    return this.userRepository.findOne({ where: { username } });
  }


  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['sentFriendRequests', 'receivedFriendRequests', 'friends'],
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Send a friend request
  async sendFriendRequest(requesterId: number, accepterId: number): Promise<User> {
    const requester = await this.userRepository.findOne({
      where: { id: requesterId },
      relations: ['sentFriendRequests'],
    });
    const accepter = await this.userRepository.findOne({
      where: { id: accepterId },
      relations: ['receivedFriendRequests'], // Include receivedFriendRequests in the query
    });

    if (!requester || !accepter) {
      throw new NotFoundException('User not found');
    }

    // Add accepterId to requester's sentFriendRequests if not already present
    if (!requester.sentFriendRequests.find(user => user.id === accepterId)) {
      requester.sentFriendRequests.push(accepter);
    }

    // Add requesterId to accepter's receivedFriendRequests if not already present
    if (!accepter.receivedFriendRequests.find(user => user.id === requesterId)) {
      accepter.receivedFriendRequests.push(requester);
    }

    await this.userRepository.save(requester); // Save the requester
    await this.userRepository.save(accepter);  // Save the accepter

    return requester;
  }


  // Accept a friend request
  async acceptFriendRequest(requesterId: number, accepterId: number): Promise<User> {
    const requester = await this.userRepository.findOne({
      where: { id: requesterId },
      relations: ['friends'],
    });
    const accepter = await this.userRepository.findOne({
      where: { id: accepterId },
      relations: ['friends', 'receivedFriendRequests'],
    });

    if (!requester || !accepter) {
      throw new NotFoundException('User not found');
    }

    // Add each other to friends list
    requester.friends.push(accepter);
    accepter.friends.push(requester);

    // Remove from received/sent friend requests arrays
    accepter.receivedFriendRequests = accepter.receivedFriendRequests.filter(
      user => user.id !== requesterId,
    );
    requester.sentFriendRequests = requester.sentFriendRequests.filter(
      user => user.id !== accepterId,
    );

    await this.userRepository.save(requester);
    await this.userRepository.save(accepter);

    return accepter;
  }

  // Remove a friend request
  async removeFriendRequest(requesterId: number, accepterId: number): Promise<User> {
    const requester = await this.userRepository.findOne({
      where: { id: requesterId },
      relations: ['sentFriendRequests'],
    });
    const accepter = await this.userRepository.findOne({
      where: { id: accepterId },
      relations: ['receivedFriendRequests'],
    });

    if (!requester || !accepter) {
      throw new NotFoundException('User not found');
    }

    // Remove from the friend requests arrays
    requester.sentFriendRequests = requester.sentFriendRequests.filter(user => user.id !== accepterId);
    accepter.receivedFriendRequests = accepter.receivedFriendRequests.filter(user => user.id !== requesterId);

    await this.userRepository.save(requester);
    await this.userRepository.save(accepter);

    return requester;
  }

  // Get all friends for a user
  async getFriends(userId: number): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.friends;
  }
}
