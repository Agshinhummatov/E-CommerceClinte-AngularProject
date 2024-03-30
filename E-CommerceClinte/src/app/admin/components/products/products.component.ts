import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
// import { Product } from '../../../contracts/create_product';

@Component({
  selector: 'app-products',

  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent extends  BaseComponent implements OnInit  {

  constructor(spinner: NgxSpinnerService, private htppClientService: HttpClientService) { 
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballAtom);
    // this.htppClientService.get<Product[]>({
    //   controller: "Products",   
    // }).subscribe((data => console.log(data) ));

    // this.htppClientService.post(
    //   {
    //     controller: "Products",
    //   },
    //   {
    //     name: "Product 4",
    //     price: 100,
    //     stock: 10
    //   }
    // ).subscribe();


    // this.htppClientService.put({
    //   controller: "Products",
    // },
    // {
    //   id: "77c0e3bd-f521-4cd2-8e2f-08dc4d1ed66d",
    //   name: "roya",
    //   price: 100,
    //   stock: 10
    // }).subscribe((data) => {
    //   console.log(data);
      
    // })


    // this.htppClientService.delete({
    //   controller: "products",
    // }, "70efab3d-3ecd-47d2-df8a-08dc4d21aafa"
    // ).subscribe();
   
    // this.htppClientService.get({
    //  fullEndPoint: "https://jsonplaceholder.typicode.com/posts"
    // }).subscribe((data) => {
    //   console.log(data);
    // });
    
  }
}
