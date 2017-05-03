import {Route, Get, Post, Delete, Patch, Example, Body} from 'tsoa';
import {User } from '../models/user';
import {  UserService } from '../service/userService';

@Route('Users')
export class UsersController {

 
    /** Get users*/
    @Get('{Getusers}')
    public async GetUsers(): Promise<User[]> {
        var service=new UserService();
        return  service.getUsers();
    }

    /** Get user by ID */
    @Get('{userId}')
    public async Get(userId: number): Promise<User> {
        var service=new UserService();
        return  service.getUser(userId);
    }

    /** 
     * Create a user 
     * @param request This is a user creation request description 
     */
    @Post()
    public async Create(@Body() request: User): Promise<User> {
           var service=new UserService();
        /*   var isuer:User;
           isuer.namel=request.namel;
           isuer.email=request.email;*/
        return  service.newUser(request)
    }
     

    /** Delete a user by ID */
    @Delete('{userId}')
    public async Delete(userId: number): Promise<void> {
        var service=new UserService();
        return  service.deleteUser(userId);
         
    }

    /** Update a user */
    @Patch()
    public async Update(@Body() request: User): Promise<User> {
        var service=new UserService();
           var isuer:User;
           isuer.namel=request.namel;
           isuer.email=request.email;
        return  service.updateUser(isuer)
    }
}
