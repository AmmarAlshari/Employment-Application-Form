import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // your MySQL password
      database: 'application', // your DB name
      autoLoadEntities: true,
      synchronize: true,
      entities: entities,
    }),
  ],
})
export class DatabaseModule {}
