import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UtilitiesService } from 'src/app/utilities/app.utilities';
import { UserCreateDto } from 'src/user/validations/user.validations';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    private utilities: UtilitiesService,
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    const data = {};
    const user = this.user.findOneBy({ email: email });
    let isMatch = false;
    if (user) {
      isMatch = await bcrypt.compare(password, (await user).password);
    }
    return isMatch;
  }

  async register(user: UserCreateDto): Promise<User> {
    user.password = await this.utilities.encryptPassword(user.password)
    const newUser = this.user.save(user)
    return newUser;
  }

  async get(email: string): Promise<User> {
    return this.user.findOneBy({ email: email })
  }

}
