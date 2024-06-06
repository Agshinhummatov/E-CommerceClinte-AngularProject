import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
// import { ComponentType} from './services/common/dynamic-load-component.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // styleUrl değil styleUrls olmalı
})
export class AppComponent {

  @ViewChild(DynamicLoadComponentDirective, {static: true})
   dynamicLoadComponentDirective : DynamicLoadComponentDirective;

  constructor(public authService: AuthService ,private toasterService : CustomToastrService, 
    private router: Router , private dynamicLoadComponentService : DynamicLoadComponentService) {
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

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
  
}


