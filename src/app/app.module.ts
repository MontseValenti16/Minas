import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscaminasModule } from "./buscaminas/buscaminas.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BuscaminasModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
