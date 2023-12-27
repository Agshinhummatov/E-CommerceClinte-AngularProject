import { Component, OnInit } from '@angular/core';

import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';


@Component({
  selector: 'app-dashboards',
 
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent implements OnInit {

  constructor(private alertify : AlertifyService) { }

  ngOnInit(): void {

   

   
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
