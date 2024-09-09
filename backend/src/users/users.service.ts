import { Injectable } from '@nestjs/common';
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
}
