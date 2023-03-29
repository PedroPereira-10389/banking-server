import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_A') private readonly gatewayProxy: ClientProxy,
  ) {}

  auth(user: any) {
    const pattern = { cmd: 'authenticate' };
    const payload = user;
    return this.gatewayProxy
      .send<string>(pattern, payload)
      .pipe(map((response: string) => ({ response })));
  }

  register(user: any) {
    const pattern = { cmd: 'create' };
    const payload = user;
    return this.gatewayProxy
      .send<string>(pattern, payload)
      .pipe(map((response: string) => ({ response })));
  }

  profile(req: any) {
    const pattern = { cmd: 'profile' };
    const payload = req;
    return this.gatewayProxy
      .send<any>(pattern, payload)
      .pipe(map((response: string) => ({ response })));
  }

  authlogin(user: any) {
    const pattern = { cmd: 'authlogin' };
    const payload = user;
    return this.gatewayProxy
      .send<string>(pattern, payload)
      .pipe(map((response: string) => ({ response })));
  }
}
