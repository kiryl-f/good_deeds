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
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    console.log('trying to find user ', username, ' resulting in ' + this.userRepository.findOne({ where: { username } }));
    return this.userRepository.findOne({ where: { username } });
  }

  
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // async create(user: Partial<User>): Promise<User> {
  //   const newuser = this.userRepository.create(user);
  //   return this.userRepository.save(newuser);
  // }

  // Create a new user with hashed password
  async create(user: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt(); // Generate a salt
    const hashedPassword = await bcrypt.hash(user.password, salt); // Hash the password
    user.password = hashedPassword; // Replace the plain text password with the hashed one
    return this.userRepository.save(user); // Save the user in the database
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
    const requester = await this.userRepository.findOne({ where: { id: requesterId } });
    const accepter = await this.userRepository.findOne({ where: { id: accepterId } });

    if (!requester || !accepter) {
      throw new NotFoundException('User not found');
    }

    // Add accepterId to requester's sentFriendRequests if not already present
    if (!requester.sentFriendRequests.includes(accepterId)) {
      requester.sentFriendRequests.push(accepterId);
      await this.userRepository.save(requester);
    }

    // Add requesterId to accepter's receivedFriendRequests if not already present
    if (!accepter.receivedFriendRequests.includes(requesterId)) {
      accepter.receivedFriendRequests.push(requesterId);
      await this.userRepository.save(accepter);
    }

    return requester;
  }

  // Accept a friend request
  async acceptFriendRequest(requesterId: number, accepterId: number): Promise<User> {
    const requester = await this.userRepository.findOne({ where: { id: requesterId } });
    const accepter = await this.userRepository.findOne({ where: { id: accepterId } });

    if (!requester || !accepter) {
      throw new NotFoundException('User not found');
    }

    // Remove from received/sent friend requests arrays
    requester.sentFriendRequests = requester.sentFriendRequests.filter(id => id !== accepterId);
    accepter.receivedFriendRequests = accepter.receivedFriendRequests.filter(id => id !== requesterId);

    // Optionally, add each other to a "friends" list (if implementing actual friends list)
    await this.userRepository.save(requester);
    await this.userRepository.save(accepter);

    return accepter;
  }

  // Remove a friend request
  async removeFriendRequest(requesterId: number, accepterId: number): Promise<User> {
    const requester = await this.userRepository.findOne({ where: { id: requesterId } });
    const accepter = await this.userRepository.findOne({ where: { id: accepterId } });

    if (!requester || !accepter) {
      throw new NotFoundException('User not found');
    }

    // Remove from the friend requests array
    requester.sentFriendRequests = requester.sentFriendRequests.filter(id => id !== accepterId);
    accepter.receivedFriendRequests = accepter.receivedFriendRequests.filter(id => id !== requesterId);

    await this.userRepository.save(requester);
    await this.userRepository.save(accepter);

    return requester;
  }

  // Get all friends (optional)
  async getFriends(userId: number): Promise<User[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.findByIds(user.sentFriendRequests); // Assuming friends are saved here
  }
}
