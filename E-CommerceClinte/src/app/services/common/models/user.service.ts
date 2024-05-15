import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Create_Users } from '../../../contracts/users/create_users';
import { Observable, firstValueFrom } from 'rxjs';

import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { Token } from '../../../contracts/token/token';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_Users> {
    const observable: Observable<Create_Users | User> = this.httpClientService.post<Create_Users | User>({
      controller: "users"
    }, user)

    return await firstValueFrom(observable) as Create_Users;

  }

 
}
