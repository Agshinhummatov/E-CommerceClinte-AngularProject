import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { QrcodeDialogComponent } from '../../../../dialogs/qrcode-dialog/qrcode-dialog.component';



@Component({
  selector: 'app-list',

  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private dialogService: DialogService,) {

    super(spinner);

  }



  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate', 'updatedDate', 'photos', 'qrcode' ,'edit', 'delete'];

  dataSource: MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.ballAtom);
    const allProducts: { totalProductCount: number; products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.ballAtom), errorMessage =>
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight


      }));

    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalProductCount;



  }


  addProductImages(id: string) {
    this.dialogService.openDialog({
     componentType: SelectProductImageDialogComponent,
     data: id,
     options:{
      width: "1300px"
     }
     

    })

  }

  async pageChanged() {

    await this.getProducts();

  }

  async ngOnInit() {

    await this.getProducts();

  }

  showQRCode(productId){

    this.dialogService.openDialog({
      componentType : QrcodeDialogComponent,
      data : productId,
      afterClosed : () => {},
      options:{
        width: "1300px"
       }
    })
  }


}




