import { Injectable } from '@angular/core';
declare var alertify : any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  // message( message:string ,  messageType : MessageType , position : Position , dealy : number = 3 , dismissable : boolean = false)
  message( message:string ,  opptions : Partial<AlertifyOptions>)
  {
   
    alertify.set('notifier','delay', opptions.dealy);
   
    alertify.set('notifier','position', opptions.position);
    const msj = alertify[opptions.messageType](message);
    if(opptions.dismissable){
      msj.dismissOthers();
    }
    
  }

  dismiss(){
    alertify.dismissAll();
  }
}


export class AlertifyOptions{
  messageType : MessageType = MessageType.Message;
  position : Position = Position.TopCenter;
  dealy : number = 3;
  dismissable : boolean = false;

}

export enum MessageType{
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"

}

export enum Position{
  TopCenter = "top-center",
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right",
}