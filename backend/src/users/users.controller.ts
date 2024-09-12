import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<any> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(id);
  }

  @Post(':id/friend-request')
  async sendFriendRequest(
    @Param('id') requesterId: number,
    @Body('accepterId') accepterId: number,
  ): Promise<User> {
    return this.usersService.sendFriendRequest(requesterId, accepterId);
  }

  @Post(':id/accept-friend-request')
  async acceptFriendRequest(
    @Param('id') accepterId: number,
    @Body('requesterId') requesterId: number,
  ): Promise<User> {
    return this.usersService.acceptFriendRequest(requesterId, accepterId);
  }

  @Delete(':id/friend-request')
  async removeFriendRequest(
    @Param('id') requesterId: number,
    @Body('accepterId') accepterId: number,
  ): Promise<User> {
    return this.usersService.removeFriendRequest(requesterId, accepterId);
  }

  @Get(':id/friends')
  async getFriends(@Param('id') userId: number): Promise<User[]> {
    return this.usersService.getFriends(userId);
  }

  @Delete(':userId/friends/:friendId')
  async removeFriend(
    @Param('userId') userId: number,
    @Param('friendId') friendId: number,
  ): Promise<void> {
    await this.usersService.removeFriend(userId, friendId);
  }
}
