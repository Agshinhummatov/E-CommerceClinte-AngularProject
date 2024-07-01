import { NgModule } from '@angular/core';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';




@NgModule({
  declarations: [],
  
  imports: [
   CommonModule,
   ProductsModule,
   CustomersModule,
   OrdersModule,
   DashboardsModule,
   AuthorizeMenuModule

  ]
})
export class ComponentsModule { }
