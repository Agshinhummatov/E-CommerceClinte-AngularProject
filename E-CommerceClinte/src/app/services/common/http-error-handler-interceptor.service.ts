import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService, private router: Router, private spinner: NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized: //401 error



        this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
          debugger;
          if (!state) {
            const url = this.router.url;
            if (url == "/products")
              this.toastrService.message("You need to log in to add items to the cart.", "Sign in!", {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight
              });
            else
              this.toastrService.message("You are not authorized to perform this action!", "Yetkisiz işlem!", {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.BottomFullWidth
              });
          }
        }).then(data => {

        });
        break;
        case HttpStatusCode.InternalServerError: //500 error
          this.toastrService.message("An error occurred while processing your request", "Internal Server Error", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopFullWidth
          })

          break;
        case HttpStatusCode.NotFound: //404 error
          this.toastrService.message("The requested resource was not found", "Not Found", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })

          break;
        case HttpStatusCode.BadRequest: //400 error
          this.toastrService.message("The request is invalid", "Bad Request", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopFullWidth
          })
          break;
        default:
          this.toastrService.message("An error occurred while processing your request", "Error", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopFullWidth
          })
          break;
      }
      this.spinner.hide(SpinnerType.ballAtom)
      return of(error)
    }))
  }
}
