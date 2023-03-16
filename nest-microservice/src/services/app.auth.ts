import { Injectable, Inject } from "@nestjs/common";
import { UtilitiesService } from '../utilities/app.utilities'
import { UserService } from '../services/app.user'
import { HttpServiceService } from '../http-service/http-service.service'
import { map } from "rxjs";

@Injectable()
export class AuthService {
  constructor(private utilities: HttpServiceService, @Inject(UserService) private userAuth: UserService) { }

  async auth(email: string, password: string) {
    let data = {};
    let results = {}
    const isUser = await this.userAuth.login(email, password);
    if (isUser) {
      const basiqAuth = await this.utilities.post(process.env.BASIQ_BASE_URL + 'token', data)
      results = basiqAuth.data
    } else {
      results = { "status": 404, "message": "Not Authorize" }
    }

    return results;
  }
}

