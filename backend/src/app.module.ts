import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'good_deeds',
      password: 'good_deeds',
      database: 'good_deeds_db',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
