import {Args, Query, Resolver} from '@nestjs/graphql';
import { User } from '../models/users.model';
import { UserService } from '../services/app.user';


@Resolver('UsersResolver')
export class UsersResolver {
    constructor(private user:UserService){}

    @Query(()=>User)
    async getUser(
        @Args('email',{type:() => String})
        email:string
    ){
        try{
            return await this.user.get(email)
        }catch(error){
            console.log('[UsersResolver]: Error while fetching getUser')
        }
    }
}