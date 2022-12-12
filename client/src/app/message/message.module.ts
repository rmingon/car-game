import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    MessageComponent
  ],
  exports: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MessageModule { }
