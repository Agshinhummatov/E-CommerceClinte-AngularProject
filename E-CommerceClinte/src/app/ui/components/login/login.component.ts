import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { UserService } from '../../../services/common/models/user.service';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Route } from '@angular/router';

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
     private router : Route) {
    super(spinner)
  }

  ngOnInit(): void {
  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.ballAtom);
    await this.userService.login(usernameOrEmail, password,
      () =>{
        this.authService.identityCheck();
        this.activatedRoute.params.subscribe(params => {
         const returnUrl : string = params["retrnUrl"];
         if(returnUrl)
         this.router.navigate([returnUrl])

        })
        
        this.hideSpinner(SpinnerType.ballAtom)
      } 
    );
  }
}