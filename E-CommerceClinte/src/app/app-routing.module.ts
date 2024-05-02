import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardsComponent } from './admin/components/dashboards/dashboards.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [


    {
        path: 'admin', component: LayoutComponent, children: [
            { path: "", component: DashboardsComponent },
            {
                path: 'customers', loadChildren: () => import('./admin/components/customers/customers.module')
                    .then(module => module.CustomersModule)
            },
            {
                path: 'products', loadChildren: () => import('./admin/components/products/products.module')
                    .then(module => module.ProductsModule)
            },
            {
                path: 'orders', loadChildren: () => import('./admin/components/orders/orders.module')
                    .then(module => module.OrdersModule)
            }
        ]
    },
    {path: "", component:HomeComponent},
    {path:"basket",loadChildren:()=>import('./ui/components/baskets/baskets.module').then(module=>module.BasketsModule)},
    {path:"product",loadChildren:()=>import('./ui/components/products/products.module').then(module=>module.ProductsModule)},
    {path:"register",loadChildren:()=>import('./ui/components/register/register.module').then(module=>module.RegisterModule)},
    { path: "login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule) },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
