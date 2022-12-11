import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeedPartyComponent } from './need-party.component';

@NgModule({
  declarations: [
    NeedPartyComponent
  ],
  exports: [
    NeedPartyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NeedPartyModule { }
