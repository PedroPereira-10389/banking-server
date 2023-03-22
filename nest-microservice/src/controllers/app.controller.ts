import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { AuthService } from '../services/app.auth';
import { UserService } from '../services/app.user';

@Controller()
export class AppController {
  constructor(private authenticate: AuthService, private user: UserService) { }

  @MessagePattern({ cmd: "authenticate" })
  async authUser(data: { user: { email: string; password: string } }): Promise<any> {
    const auth = await this.authenticate.auth(data.user.email, data.user.password);
    return auth;
  }

  @MessagePattern({ cmd: "create" })
  async register(data) {
    try {
      await this.user.register(data.user);
      return { "status": 200, "message": "User created successfully" }
    } catch (error) {
      return { "status": 500, "message": error }
    }
  }
}
