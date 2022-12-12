import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car.component';



@NgModule({
  declarations: [
    CarComponent
  ],
  exports: [
    CarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CarModule { }
