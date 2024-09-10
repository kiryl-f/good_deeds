// src/gooddeeds/gooddeeds.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GoodDeedsService } from './deeds.service';
import { GoodDeed } from './deed.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assuming JWT Auth is in place
import { GetUser } from '../auth/get-user.decorator'; // Custom decorator to get user from JWT
import { User } from '../users/user.entity';

@Controller('deeds')
@UseGuards(JwtAuthGuard) // Protect the endpoints with JWT Auth
export class GoodDeedsController {
  constructor(private readonly goodDeedsService: GoodDeedsService) {}

  @Get()
  async getAllDeeds(@GetUser() user: User): Promise<GoodDeed[]> {
    // Fetch all deeds belonging to the authenticated user
    return this.goodDeedsService.findAllByUser(user);   
  }

  @Post()
  async createDeed(@Body() deedData: Partial<GoodDeed>, @GetUser() user: User): Promise<GoodDeed> {
    // Create a new deed associated with the authenticated user
    return this.goodDeedsService.create(deedData, user);
  }

  @Put(':id')
  async updateDeed(
    @Param('id') id: number,
    @Body() deedData: Partial<GoodDeed>,
    @GetUser() user: User,
  ): Promise<GoodDeed> {
    // Update a deed that belongs to the authenticated user
    return this.goodDeedsService.update(id, deedData, user);
  }

  @Delete(':id')
  async deleteDeed(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    // Delete a deed that belongs to the authenticated user
    return this.goodDeedsService.delete(id, user);
  }
}
