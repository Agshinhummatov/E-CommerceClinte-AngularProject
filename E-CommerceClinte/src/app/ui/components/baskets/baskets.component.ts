import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from '../../../services/common/models/basket.service';
import { List_Basket_Item } from '../../../contracts/baskets/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/baskets/update_basket_item';

declare var $: any;


@Component({
  selector: 'app-baskets',

  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.css'
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private basketService: BasketService) {
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

  
  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.ballAtom);
    await this.basketService.remove(basketItemId);

    var a = $("." + basketItemId)
    $("." + basketItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.ballAtom));
  }

 
  
}
