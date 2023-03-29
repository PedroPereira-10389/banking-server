import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpServiceService } from '../http-service/http-service.service';
import { UserService } from '../../user/services/app.user';
import { JwtService } from '@nestjs/jwt';
import { UtilitiesService } from '../utilities/app.utilities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpServiceService,
    private users: UserService,
    private jwtService:JwtService,
    private utilities: UtilitiesService,
    @Inject(UserService) private userAuth: UserService,
  ) {}

  async auth(email: string, password: string) {
    let data = {};
    let results = {};
    const isUser = await this.userAuth.login(email, password);
    if (isUser) {
      const basiqAuth = await this.http.post(
        process.env.BASIQ_BASE_URL + 'token',
        data,
      );
      results = basiqAuth.data;
    } else {
      results = { status: 404, message: 'Not Authorize' };
    }

    return results;
  }

  async signIn(email: string, pass: string): Promise<any> {
    
    const user = await this.users.get(email);
    
    const isMatch = await bcrypt.compare(pass, (await user).password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {username:user.full_name,id:user.id}
    return {access_token : await this.jwtService.signAsync(payload)};
  }
}
