import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { UserService } from '../../../services/common/models/user.service';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from '../../../services/common/http-client.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) {
    super(spinner)
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user)
      this.showSpinner(SpinnerType.ballAtom);
      switch (user.provider) {
        case "GOOGLE":
          await userService.googleLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.ballAtom);
          })
          break;
        case "FACEBOOK":
          await userService.facebookLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.ballAtom);
          })
          break;
      }

    });

  }

  ngOnInit(): void {
  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.ballAtom);
    await this.userService.login(usernameOrEmail, password,
      () => {
        this.authService.identityCheck();
        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"];
          if (returnUrl)
            this.router.navigate([returnUrl]); // Router kullanıldı
        });

        this.hideSpinner(SpinnerType.ballAtom)
      }
    );
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

  }
}
