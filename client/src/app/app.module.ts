import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {WSService} from "./ws/ws.service";
import {FormsModule} from "@angular/forms";
import {TrafficLightModule} from "./traffic-light/traffic-light.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TrafficLightModule,
  ],
  providers: [WSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
