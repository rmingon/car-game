import { Component } from '@angular/core';

@Component({
  selector: 'app-traffic-light',
  template: `<div class="flex flex-col">
      <span class="bg-red-500 h-4 w-4 rounded-full"></span>
      <span class="bg-green-500 h-4 w-4 rounded-full"></span>
    </div>`
})
export class TrafficLightComponent {

}
