import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from '../../../services/common/models/basket.service';
import { List_Basket_Item } from '../../../contracts/baskets/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/baskets/update_basket_item';
import { OrderService } from '../../../services/common/models/order.service';
import { Create_Order } from '../../../contracts/order/create_order';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { DialogService } from '../../../services/common/dialog.service';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from '../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingComplateDialogComponent, ShoppingComplateState } from '../../../dialogs/shopping-complate-dialog/shopping-complate-dialog.component';

declare var $: any;


@Component({
  selector: 'app-baskets',

  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.css'
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private basketService: BasketService,
    private orderService: OrderService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dialogService: DialogService) {
    super(spinner);
  }

  basketItems: List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.ballAtom)
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.ballAtom)
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.ballAtom)
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.ballAtom)
  }


  removeBasketItem(basketItemId: string) {
 $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {

        this.showSpinner(SpinnerType.ballAtom);
        await this.basketService.remove(basketItemId);
        var a = $("." + basketItemId)
        $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.ballAtom));
        $("#basketModal").modal("show");
      }
    })
    
  }

  shopingComplete() {
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
     componentType: ShoppingComplateDialogComponent,
     data: ShoppingComplateState.Yes,

     afterClosed: async () => {

      this.showSpinner(SpinnerType.ballAtom);
      const order: Create_Order = new Create_Order();
      order.address = "test";
      order.description = "test";
      await this.orderService.create(order);
      this.hideSpinner(SpinnerType.ballAtom);
      this.toastrService.message("Siparişiniz başarıyla alınmıştır", "Siparişiniz alınmıştır", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
      this.router.navigate(["/"])
  
     }

    })

   
  }



}
