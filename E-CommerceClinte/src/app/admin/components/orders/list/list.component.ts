import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { MatPaginator } from '@angular/material/paginator';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { List_Order } from '../../../../contracts/order/list_order';
import { OrderService } from '../../../../services/common/models/order.service';
import { OrderDetailDialogComponent, OrderDetailDialogState } from '../../../../dialogs/order-detail-dialog/order-detail-dialog.component';


@Component({
  selector: 'app-list',
 
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertify: AlertifyService,
    private dialogService: DialogService,) {

    super(spinner);

  }



  displayedColumns: string[] = ['orderCode', 'userName','totalPrice', 'createdDate','completed','viewdetail','delete'];

  dataSource: MatTableDataSource<List_Order> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders() {
    this.showSpinner(SpinnerType.ballAtom);
    debugger;
    const allOrders: { totalOrderCount: number; orders: List_Order[] } = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.ballAtom),
    (errorMessage: any) =>
      this.alertify.message(errorMessage.message, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
        
      }));
      
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;

  }


 

  async pageChanged() {

    await this.getOrders();

  }

  async ngOnInit() {

    await this.getOrders();

  }


  showDetail(id : string){
  this.dialogService.openDialog({
    componentType : OrderDetailDialogComponent,
    data : id,
    options:{
      width: '1200px',
    }
  })
  }
}
