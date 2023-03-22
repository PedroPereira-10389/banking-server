import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  test() {
    return { message: 'hi' };
  }

  @Post('/auth')
  authToken(@Body() user: { email: string; password: string }) {
    return this.appService.auth(user);
  }

  @Post('/register')
  register(@Body() user: { email: string; password }) {
    return this.appService.register(user);
  }
}
