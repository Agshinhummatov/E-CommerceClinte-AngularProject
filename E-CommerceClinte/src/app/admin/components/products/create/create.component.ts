import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/create_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {

    super(spinner);


  }
  ngOnInit(): void {

  }

 

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  

  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement) {

    this.showSpinner(SpinnerType.ballAtom)
    const create_prodcut: Create_Product = new Create_Product();
    create_prodcut.name = name.value;
    create_prodcut.price = parseFloat(price.value);
    create_prodcut.stock = parseInt(stock.value);
    //   () => bu methodum menden ProductService classinda create methoduna gonderilir ve orda subscribe methodu  icindeki  succsesCallBack(); kimi qebul edir onu any methodur bir callback gondermisik icine
    this.productService.create(create_prodcut, () => {
      this.hideSpinner(SpinnerType.ballAtom)
      this.alertify.message("Product created successfully", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight,
      });
      this.createdProduct.emit(create_prodcut);
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
