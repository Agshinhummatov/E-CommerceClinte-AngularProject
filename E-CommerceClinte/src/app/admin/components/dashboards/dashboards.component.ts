import { Component, OnInit } from '@angular/core';

import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboards',
 
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent extends BaseComponent implements OnInit {

  constructor(private alertify : AlertifyService, spinner : NgxSpinnerService) {

    super(spinner);
   }

  ngOnInit(): void {

   this.showSpinner(SpinnerType.ballScaleMultiple);

   
  }

  m(){
    this.alertify.message("merhaba", {
      messageType : MessageType.Message,
      position : Position.BottomCenter,
      dealy : 3,
     
    });
   
  }

  d(){
    this.alertify.dismiss();
  }
}
