import { Component, OnInit } from '@angular/core';

import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from '../../../services/common/signalr.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hubs-url';


@Component({
  selector: 'app-dashboards',
 
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent extends BaseComponent implements OnInit {

  constructor(private alertify : AlertifyService, spinner : NgxSpinnerService, private signalRService: SignalRService ) {

    super(spinner);
    // signalRService.start(HubUrls.OrderHub)
    // signalRService.start(HubUrls.ProductHub)
    
   }

  ngOnInit(): void {

  //  this.showSpinner(SpinnerType.ballScaleMultiple);
  this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
    this.alertify.message(message, {
      messageType: MessageType.Notify,
      position: Position.TopRight
    })
  });
   

  this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
    this.alertify.message(message, {
      messageType: MessageType.Notify,
      position: Position.TopCenter
    })
  });
  }

  m(){
    this.alertify.message("merhaba", {
      messageType : MessageType.Message,
      position : Position.BottomCenter,
      delay : 3,
     
    });
   
  }

  d(){
    this.alertify.dismiss();
  }
}
