import { Route, Get, Post, Delete, Patch, Body } from 'tsoa';
import { User } from '../models/user';
import { getConnectionManager, Repository, } from 'typeorm';

@Route('Users')
export class UsersController {

    private uRepo: Repository<User>;

    constructor() {
        this.uRepo = getConnectionManager().get().getRepository(User);
    }

    /** Get users*/
    @Get('{Getusers}')
    public async GetUsers(): Promise<User[]> {
        return this.uRepo.find();
    }

    /** Get user by ID */
    @Get('{userId}')
    public async Get(userId: number): Promise<User> {

        return this.uRepo.findOneById(userId);
    }

    /**
     * Create a user
     * @param request This is a user creation request description
     */
    @Post()
    public async Create( @Body() request: User): Promise<User> {
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
    public async Update( @Body() request: User): Promise<User> {
        const cus = new User();
        cus.namel = request.namel;
        cus.email = request.email;
        this.uRepo.persist(cus);
        return cus;
    }
}
