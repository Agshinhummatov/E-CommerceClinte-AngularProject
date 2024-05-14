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

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "users",
      action: "login"
    }, { userNameOrEmail, password })

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      // localStorage.setItem("expiration", tokenResponse.token.expiration.toString());

      this.toastrService.message("Login successful", "Login success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight

      })
    }


    callBackFunction();
  }

  // async googleLogin(user: SocialUser, callBackFunction?: () => void) : Promise<any> {
  //   const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
  //     action: "google-login",
  //     controller: "users",

  //   }, user)

  //   const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse
  //   if (tokenResponse) {
  //     localStorage.setItem("accessToken", tokenResponse.token.accessToken);
  //     this.toastrService.message("Google login successful", "Login success", {
  //       messageType: ToastrMessageType.Success,
  //       position: ToastrPosition.TopRight

  //     })
  //   }

  //   callBackFunction();
  // }
  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "users"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Google üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }

    callBackFunction();
  }

 async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
  const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
    controller: "users",
    action: "facbook-login"
  }, user);

  const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

  if (tokenResponse) {
    localStorage.setItem("accessToken", tokenResponse.token.accessToken);

    this.toastrService.message("Facbook üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }

  callBackFunction();

  }
}
