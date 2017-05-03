import { User } from '../models/user';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User>
{
    public getAllUsers() {
        return this.find();
    }
    public getUserId(id: number) {
        return this.findOneById(id);
    }
    public deleteUser(user: User) {
      return  this.remove(user);
    }
    public UpdateUser(user: User){
    let up = this.findOneById(user.id);
          const cus = new User();
        cus.namel = user.namel;
        cus.email = user.email;
          // this.create(cus)
          this.persist(cus);
    }
    public CreateUser(user: User)
    {
        const cus = new User();
        cus.namel = user.namel;
        cus.email = user.email;
          // this.create(cus)
          this.persist(cus);
    }

}