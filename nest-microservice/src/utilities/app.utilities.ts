import { ForbiddenException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map, catchError, Observable } from 'rxjs';
import { Logger } from "@nestjs/common";
import { AxiosResponse } from "axios";
import * as bcrypt from 'bcrypt';


const logger = new Logger();
@Injectable()
export class UtilitiesService {
    constructor(private http: HttpService) { }
    async encryptPassword(password: string) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }


}