import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficLightComponent } from './traffic-light.component';



@NgModule({
  declarations: [
    TrafficLightComponent
  ],
  exports: [
    TrafficLightComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TrafficLightModule { }
