import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { DeedsService } from './deeds.service';
import { Deed } from './deed.entity';

@Controller('deeds')
export class DeedsController {
  constructor(private deedsService: DeedsService) {}

  @Get()
  findAll(): Promise<Deed[]> {
    return this.deedsService.findAll();
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: number): Promise<Deed[]> {
    return this.deedsService.findByUserId(userId);
  }

  @Post()
  createDeed(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('userId') userId: number, // Receive userId from the request body
  ): Promise<Deed> {
    return this.deedsService.create(title, description, userId);
  }
}
