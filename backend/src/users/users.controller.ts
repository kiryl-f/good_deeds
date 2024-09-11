import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  //get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //get user by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    console.log('user create')
    return this.usersService.create(user);
  }

  //update user
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<any> {
    return this.usersService.update(id, user);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(id);
  }

  // Endpoint to send a friend request
  @Post(':id/friend-request')
  async sendFriendRequest(
    @Param('id') requesterId: number,
    @Body('accepterId') accepterId: number,
  ): Promise<User> {
    return this.usersService.sendFriendRequest(requesterId, accepterId);
  }

  // Endpoint to accept a friend request
  @Post(':id/accept-friend-request')
  async acceptFriendRequest(
    @Param('id') accepterId: number,
    @Body('requesterId') requesterId: number,
  ): Promise<User> {
    return this.usersService.acceptFriendRequest(requesterId, accepterId);
  }

  // Endpoint to remove a friend request
  @Delete(':id/friend-request')
  async removeFriendRequest(
    @Param('id') requesterId: number,
    @Body('accepterId') accepterId: number,
  ): Promise<User> {
    return this.usersService.removeFriendRequest(requesterId, accepterId);
  }
}

