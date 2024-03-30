import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/create_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';




@Component({
  selector: 'app-create',

  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent extends BaseComponent implements OnInit {


  constructor(spiner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {

    super(spiner);


  }
  ngOnInit(): void {

  }
  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement) {

    this.showSpinner(SpinnerType.ballAtom)
    const create_prodcut: Create_Product = new Create_Product();
    create_prodcut.name = name.value;
    create_prodcut.price = parseFloat(price.value);
    create_prodcut.stock = parseInt(stock.value);

    if (!name.value) {
      this.alertify.message("Lütfen ürün adını giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }

    if (parseInt(stock.value) < 0) {
      this.alertify.message("Lütfen stok bilgisini doğru giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }

    if (parseInt(price.value) < 0) {
      this.alertify.message("Lütfen price bilgisini doğru giriniz!", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }

    //   () => bu methodum menden ProductService classinda create methoduna gonderilir ve orda subscribe methodu  icindeki  succsesCallBack(); kimi qebul edir onu any methodur bir callback gondermisik icine
    this.productService.create(create_prodcut, () => {
      this.hideSpinner(SpinnerType.ballAtom)
      this.alertify.message("Product created successfully", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight,
      });

    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });


      });

    }
}
