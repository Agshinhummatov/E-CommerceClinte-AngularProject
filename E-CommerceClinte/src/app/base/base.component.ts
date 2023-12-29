import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {

  constructor(private spinner: NgxSpinnerService) {

  }


  showSpinner(spinnerNameType: SpinnerType) {
    this.spinner.show(spinnerNameType);

    setTimeout(() => 
      this.spinner.hide(spinnerNameType), 1000);
    
  }

  hideSpinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
  }
}


export enum SpinnerType{

  ballAtom ="s1",
  ballScaleMultiple ="s2",
  ballSpinClockwiseFadeRotating ="s3",
}