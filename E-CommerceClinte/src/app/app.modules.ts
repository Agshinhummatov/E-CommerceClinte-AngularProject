import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [
    AppComponent,
    // Burada başka bileşenler de eklenebilir
  ],
  imports: [

    BrowserModule,
    // RouterModule.forRoot(routes),
    AdminModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }