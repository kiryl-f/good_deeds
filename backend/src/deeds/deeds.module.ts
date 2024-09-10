// src/gooddeeds/gooddeeds.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deed } from './deed.entity';
import { DeedsService } from './deeds.service';
import { DeedsController } from './deeds.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deed]), // Register DeedRepository
    UsersModule, // Import UsersModule to access UserRepository
  ],
  providers: [DeedsService],
  controllers: [DeedsController],
  exports: [DeedsService],
})
export class GoodDeedsModule {}
