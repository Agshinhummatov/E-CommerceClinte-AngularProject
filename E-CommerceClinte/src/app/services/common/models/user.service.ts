import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Create_Users } from '../../../contracts/users/create_users';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

 async  create(user : User) : Promise<Create_Users> {
  const observable : Observable<Create_Users | User> = this.httpClientService.post<Create_Users | User>({
      controller: "users"
    }, user)
      
    return await  firstValueFrom(observable) as Create_Users;
      
  }
}
