import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('friends')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post(':friendId')
  async addFriend(@GetUser() user: User, @Param('friendId') friendId: number) {
    return this.friendshipService.addFriend(user, friendId);
  }

  @Delete(':friendId')
  async removeFriend(@GetUser() user: User, @Param('friendId') friendId: number) {
    return this.friendshipService.removeFriend(user, friendId);
  }

  @Get()
  async getFriends(@GetUser() user: User) {
    return this.friendshipService.getFriends(user);
  }
}
