import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("/auth")
  authToken(@Body() user: { email: string, password: string }) {
    const a = 's'
    return this.appService.auth(user);
  }

  @Post("/register")
  register(@Body() user: { email: string, password }) {
    return this.appService.register(user);
  }

}
