import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HtppClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }


  private url(requestParameters: Partial<RequestParameters>): string {

    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}/${requestParameters.action ?
      `${requestParameters.action}` : ""}`;

  }
  get<T>(requestParameters: Partial<RequestParameters> , id?: string) :Observable<T> {

    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
      url = `${this.url(requestParameters)}${id ? `/${id}` : ""}`;

      return this.httpClient.get<T>(url, { headers: requestParameters.headers });
  }
  post() {

  }
  put() {

  }
  delete() {

  }


}

export class RequestParameters {

  controller?: string;
  action?: string;
  // parameters?: any;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;


}