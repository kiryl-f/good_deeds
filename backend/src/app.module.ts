import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { User } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',  // Ensure it reads DATABASE_HOST
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'good_deeds',
      password: process.env.DATABASE_PASSWORD || 'good_deeds',
      database: process.env.DATABASE_NAME || 'good_deeds_db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // UsersModule,
    // AuthModule,
  ],
})
export class AppModule {}
