import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/services/app.auth';
import { UtilitiesService } from 'src/utilities/app.utilities';
import { AppController } from '../controllers/app.controller';
import { User } from '../entities/user.entity';
import { HttpServiceService } from '../http-service/http-service.service';
import { UserService } from '../services/app.user';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, UtilitiesService, HttpServiceService, UserService],
  controllers: [AppController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
