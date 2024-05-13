import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule here
    // RouterModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        allowedDomains: ['localhost:7173']

      }

    })
  ],
  providers: [{ provide: 'baseUrl', useValue: 'https://localhost:7173/api', multi: true },
  {
    provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("227724186272-cd6hkg2ee1s62h8p7hoka7hbu8ad2ibi.apps.googleusercontent.com")
        }
      ],
      onError: err => console.log(err)
    } as SocialAuthServiceConfig
  }

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
