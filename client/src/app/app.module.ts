import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {WSService} from "./ws/ws.service";
import {FormsModule} from "@angular/forms";
import {TrafficLightModule} from "./traffic-light/traffic-light.module";
import {NeedPartyModule} from "./need-party/need-party.module";
import {CarModule} from "./car/car.module";
import {MessageModule} from "./message/message.module";
import { DirectionComponent } from './direction/direction.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TrafficLightModule,
    NeedPartyModule,
    CarModule,
    MessageModule
  ],
  providers: [WSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
