import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
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
