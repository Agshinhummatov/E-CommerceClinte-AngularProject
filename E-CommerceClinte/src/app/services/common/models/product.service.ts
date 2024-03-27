import { Injectable } from '@angular/core';
import { HtppClientService } from '../htpp-client.service';
import { Create_Product } from '../../../contracts/create_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private htppClientService : HtppClientService ) { }

  create(product: Create_Product , succsesCallBack? : any){
 this.htppClientService.post({
    controller: "Products"
  }, product).subscribe(
   result => {
    succsesCallBack();
  }
  );
  }
}
