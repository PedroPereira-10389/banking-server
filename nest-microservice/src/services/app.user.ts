import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { UtilitiesService } from "src/utilities/app.utilities";
import { UserCreateDto } from "src/validations/user.validations";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private user: Repository<User>,
        private utilities: UtilitiesService
    ) { }

    async login(email: string, password: string): Promise<boolean> {
        const data = {};
        const user = this.user.findOneBy({ email: email });
        let isMatch = false;
        if (user) {
            isMatch = await bcrypt.compare(password, (await user).password);

        }

        return isMatch;
    }

    async register(user: UserCreateDto): Promise<User> {
        this.utilities.encryptPassword(user.password)
        const newUser = this.user.create(user)
        return newUser;
    }

}