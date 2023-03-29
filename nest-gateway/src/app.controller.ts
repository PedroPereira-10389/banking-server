import { Body, Controller, Get, Post, Request } from '@nestjs/common';
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

  @Get('/auth/profile')
  profile(@Request() req) : any {
    const toSend = {
      body : req['body'],
      auth: req['rawHeaders'][1]
    }
    return this.appService.profile(toSend);
  }

  @Post('/auth/login')
  authlogin(@Body() user: { email: string; password }) {
    return this.appService.authlogin(user);
  }
}
