 
import { User} from '../models/user'
import { getEntityManager } from 'typeorm';
 export class UserService {
  public getUsers(): Promise<User[]> {
   let usersPr =  getEntityManager().getRepository(User).find();
/*   let returnType = usersPr.then((users) => {
         var userList : User[] = [];
         for (let user of users)
          {
            userList.push({id: user.id, email:user.email, namel: user.namel});
          }
          return userList;
    }).catch(console.log.bind(console));*/

    return usersPr; 
  }

  public getUser(id: number): Promise<User> {
   
     let user =  getEntityManager().getRepository(User).findOne({id:id});
  /*   let returnType = user.then((u)=> {  return  {id: u.id, email: u.email, namel: u.namel}});*/

   return user; 
  }

  public newUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {      
      /* let uentity: User = new User();
       uentity.email  = user.email;
       uentity.namel = user.namel;*/
       let e =  getEntityManager().getRepository(User).persist(user);       
       resolve(user);
  });
  }

  public updateUser(user:User): Promise<User> {
   var userRepository = getEntityManager().getRepository(User);
   var userT = userRepository.findOne({id:user.id});
 
   var returnType = userT.then((u) => {
       u.email  = user.email;
       u.namel = user.namel;
       userRepository.persist(u);
       return u;
    });
    
    return returnType;
  }

  public deleteUser(id: number) {
  var userRepository = getEntityManager().getRepository(User);
   var userT = userRepository.findOne({id:id});
    userT.then((u) => {
       userRepository.remove(u);
    });



  }
}
