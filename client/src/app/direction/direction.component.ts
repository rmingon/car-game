import {Component, EventEmitter, Input, Output} from '@angular/core';
import {sendCarEvent} from "../models/action";

@Component({
  selector: 'app-direction',
  template: `<div>
    <svg *ngIf="direction === 'top'" width="26" height="26" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#dedede" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 9.5l3 3l3-3m-3 3v-8"/></g></svg>
    <svg *ngIf="direction === 'right'" width="26" height="26" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#dedede" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 9.5l3 3l3-3m-3 3v-8"/></g></svg>
    <svg *ngIf="direction === 'bottom'" width="26" height="26" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#dedede" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 9.5l3 3l3-3m-3 3v-8"/></g></svg>
    <svg *ngIf="direction === 'left'" width="26" height="26" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#dedede" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 9.5l3 3l3-3m-3 3v-8"/></g></svg>
  </div>`
})
export class DirectionComponent {
  @Input() direction: string = "top"
  @Output() insertion = new EventEmitter<sendCarEvent>();


}
