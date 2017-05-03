import { Route, Get, Post, Delete, Patch, Body } from 'tsoa';
import { User } from '../models/user';
import { Repository, getEntityManager } from 'typeorm';
import { Application } from '../lib/application';

@Route('Users')
export class UsersController {

    private  static  _entityManager: Repository<User>;
   private static statusCode= '200';

    constructor() {
        // this.uRepo = getConnectionManager().get().getRepository(User);
        throw Error('Cannot be intantiated');
    }

    /**
     * Return Repository Manager for Product Entity
     */
    private static  db(): Repository<User> {
        let conn = Application.connectionName;
        return this._entityManager || (this._entityManager = getEntityManager(conn).getRepository(User));
    }


    /** Get users*/
    @Get('{Getusers}')
    public static  async GetUsers(): Promise<User[]> {
        return await this.db().find();
    }

    /** Get user by ID */
    @Get('{id}')
    public static  async getById(id: number): Promise<User> {

        return await this.db().findOneById(id);
    }

    /**
     * Create a user
      */
    @Post()
    public static  async Create( @Body() request: User): Promise<User> {
        const cus = new User();
        cus.namel = request.namel;
        cus.email = request.email;
        // this.create(cus)
        this.db().persist(cus);
        return cus;
    }

    @Delete('{id}')
    public static  async Delete(id: number): Promise<number> {

  let item = await this.getById(id);
        await this.db().remove(item);
        return id;

    }

    /** Update a user */
    @Patch()
    public  static async Update( @Body() request: User): Promise<User> {
        const cus = new User();
        cus.namel = request.namel;
        cus.email = request.email;
        this.db().persist(cus);
        return cus;
    }
  public  static   getStatus(){

    }
}
