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
}
