
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/app.user';
import { AppController } from '../controllers/app.controller';
import { User } from '../entities/user.entity';
import { AuthService } from 'src/services/app.auth';
import { UtilitiesService } from 'src/utilities/app.utilities';
import { HttpModule } from '@nestjs/axios';
import { HttpServiceService } from '../http-service/http-service.service'


@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([User])],
    providers: [AuthService, UtilitiesService, HttpServiceService, UserService],
    controllers: [AppController],
    exports: [TypeOrmModule]
})
export class UsersModule { }
