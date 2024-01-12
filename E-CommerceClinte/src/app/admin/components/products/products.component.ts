import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HtppClientService } from '../../../services/common/htpp-client.service';

@Component({
  selector: 'app-products',

  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent extends  BaseComponent implements OnInit  {

  constructor(spinner: NgxSpinnerService, private htppClientService: HtppClientService) { 
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballAtom);
    this.htppClientService.get({
      controller: "Products",
     
    }).subscribe((response) => {
      console.log(response);
    })
  }
}
