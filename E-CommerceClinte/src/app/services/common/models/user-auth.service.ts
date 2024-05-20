import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { userNameOrEmail, password })

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      // localStorage.setItem("expiration", tokenResponse.token.expiration.toString());
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken); 
      this.toastrService.message("Login successful", "Login success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight

      })
    }


    callBackFunction();
  }

 
  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void) : Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshtokenlogin",
      controller: "auth"
    }, { refreshToken: refreshToken });

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken); 
    }

    callBackFunction();
  }

  
  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken); 
      this.toastrService.message("Google üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }

    callBackFunction();
  }



 async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
  const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
    controller: "auth",
    action: "facbook-login"
  }, user);

  const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

  if (tokenResponse) {
    localStorage.setItem("accessToken", tokenResponse.token.accessToken); 
    localStorage.setItem("refreshToken", tokenResponse.token.refreshToken); 
    this.toastrService.message("Facbook üzerinden giriş başarıyla sağlanmıştır.", "Giriş Başarılı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }

  callBackFunction();

  }
}
