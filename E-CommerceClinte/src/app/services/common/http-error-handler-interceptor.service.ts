import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toasterService : CustomToastrService , private userAuthService: UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    return next.handle(req).pipe(catchError(error =>{
      switch (error.status) {
        case HttpStatusCode.Unauthorized: //401 error
          this.toasterService.message("You are not authorized to access this resource", "Unauthorized", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopFullWidth
            
          })

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {

          });
          break;
          case HttpStatusCode.InternalServerError: //500 error
            this.toasterService.message("An error occurred while processing your request", "Internal Server Error", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopFullWidth
            })

          break;
          case HttpStatusCode.NotFound: //404 error
            this.toasterService.message("The requested resource was not found", "Not Found", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            })

          break;
          case HttpStatusCode.BadRequest: //400 error
            this.toasterService.message("The request is invalid", "Bad Request", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopFullWidth
            })
            break;
        default:
          this.toasterService.message("An error occurred while processing your request", "Error", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopFullWidth
          })
          break;
      }
    return of(error)
    }))
  }
}
