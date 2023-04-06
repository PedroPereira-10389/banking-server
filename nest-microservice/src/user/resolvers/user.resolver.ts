import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/app/services/app.auth';
import { User } from '../models/users.model';
import { UserService } from '../services/app.user';


@Resolver('UsersResolver')
export class UsersResolver {
    constructor(private user: UserService, private authenticate: AuthService) { }

    @Query(() => User)
    async getUser(
        @Args('email', { type: () => String })
        email: string
    ) {
        try {
            return await this.user.get(email)
        } catch (error) {
            console.log('[UsersResolver]: Error while fetching getUser')
        }
    }

    @Query(() => User)
    async login(
        @Args('email', { type: () => String })
        email: string,
        @Args('password', { type: () => String })
        password: string,
    ) {
        try {
            return await this.authenticate.auth(email, password)
        } catch (error) {
            console.log('[UsersResolver]: Error while fetching getUser')
        }
    }
}