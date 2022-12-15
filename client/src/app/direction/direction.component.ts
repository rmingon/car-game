import {Component, EventEmitter, Input, Output} from '@angular/core';
import {sendCarEvent} from "../action";

@Component({
  selector: 'app-direction',
  template: `<div (click)="clicked()">
    <svg *ngIf="direction === 'top'" width="26" height="26" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#dedede" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 9.5l3 3l3-3m-3 3v-8"/></g></svg>
    <svg *ngIf="direction === 'right'" width="32" height="32" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#dedede" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m7.5 11.5l-3-3l3-3m5 3h-8"/></g></svg>
    <svg *ngIf="direction === 'bottom'" width="32" height="32" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#dedede" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m11.5 7.5l-3-3l-3 3m3-3v8"/></g></svg>
    <svg *ngIf="direction === 'left'" width="32" height="32" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#dedede" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m9.5 11.5l3-3l-3-3m3 3h-8"/></g></svg>
  </div>`
})
export class DirectionComponent {
  @Input() direction: string = "top"
  @Output() insertion = new EventEmitter<sendCarEvent>();

  clicked() {
    this.insertion.emit({direction: this.direction})
  }
}
