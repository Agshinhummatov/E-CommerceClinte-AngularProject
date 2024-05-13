import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // styleUrl değil styleUrls olmalı
})
export class AppComponent {


  constructor(public authService: AuthService ,private toasterService : CustomToastrService, private router: Router) {
    authService.identityCheck();
  }

  siginOut(){
    localStorage.removeItem("accessToken")
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toasterService.message("oturm kapatilmisdir","Oturum kapatildi",{
      messageType: ToastrMessageType.Warning,
      position : ToastrPosition.TopRight
    })
  }
}


