// src/gooddeeds/gooddeeds.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodDeed } from './deed.entity';
import { GoodDeedsService } from './deeds.service';
import { GoodDeedsController } from './deeds.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GoodDeed])],
  providers: [GoodDeedsService],
  controllers: [GoodDeedsController],
  exports: [GoodDeedsService],
})
export class GoodDeedsModule {}
