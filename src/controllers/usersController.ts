import {Route, Get, Post, Delete, Patch, Body} from 'tsoa';
import {User } from '../models/user';
import {getConnectionManager, Repository, } from 'typeorm';

//import {  UserService } from '../service/userService';
//import {  UserRepository } from '../repository/UserRepository';

@Route('Users')
export class UsersController {

    private uRepo: Repository<User>;

constructor() {
    // this.uRepo = getConnectionManager().get().getCustomRepository(UserRepository);
      this.uRepo = getConnectionManager().get().getRepository(User);
}

    /** Get users*/
    @Get('{Getusers}')
    public async GetUsers(): Promise<User[]> {
     /*   let service = new UserService();
        return  service.getUsers();*/

       return this.uRepo.find();
    }

    /** Get user by ID */
    @Get('{userId}')
    public async Get(userId: number): Promise<User> {
    /*    let service = new UserService();
        return  service.getUser(userId);*/
          return this.uRepo.findOneById(userId);
    }

    /**
     * Create a user
     * @param request This is a user creation request description
     */
    @Post()
    public async Create(@Body() request: User): Promise<User> {
           //let service = new UserService();
        /*   var isuer:User;
           isuer.namel=request.namel;
           isuer.email=request.email;*/
       // return  service.newUser(request);

         const cus = new User();
        cus.namel = request.namel;
        cus.email = request.email;
          // this.create(cus)
          this.uRepo.persist(cus);
          return cus;
    }


    /** Delete a user by ID */
    @Delete('{userId}')
    public async Delete(userId: number): Promise<void> {
      /*  let service = new UserService();
        return  service.deleteUser(userId);*/
       let cins = new User();
       let sil = this.uRepo.findOneById(userId).then(u => {
           cins.email = u.email;
           cins.namel = u.namel;
           cins.id = u.id;
       });
           this.uRepo.remove(cins);


    }

    /** Update a user */
    @Patch()
    public async Update(@Body() request: User): Promise<User> {
        /*let service = new UserService();
           let isuer: User;
           isuer.namel = request.namel;
           isuer.email = request.email;
        return  service.updateUser(isuer);*/
              const cus = new User();
        cus.namel = request.namel;
        cus.email = request.email;
          // this.create(cus)
          this.uRepo.persist(cus);
          return cus;
    }
}
