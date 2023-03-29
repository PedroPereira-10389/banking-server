import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from 'src/user/resolvers/user.resolver';
import { AuthService } from 'src/app/services/app.auth';
import { UtilitiesService } from 'src/app/utilities/app.utilities';
import { AppController } from '../app/controllers/app.controller';
import { User } from './entities/user.entity';
import { HttpServiceService } from '../app/http-service/http-service.service';
import { UserService } from './services/app.user';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, UtilitiesService, HttpServiceService, UsersResolver,UserService],
  controllers: [AppController],
  exports: [TypeOrmModule,UsersResolver],
  
})
export class UsersModule {}
