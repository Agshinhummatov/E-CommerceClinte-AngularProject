// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // AppRoutingModule'i içeri aktarın
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [
    AppComponent,
    // Burada başka bileşenler de eklenebilir
  ],
  imports: [
    BrowserModule,
    RouterModule, // RouterModule'u içeri aktardık
    AppRoutingModule, // AppRoutingModule'i içeri aktarın
    AdminModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
