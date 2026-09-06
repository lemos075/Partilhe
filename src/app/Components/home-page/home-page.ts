import { Component } from '@angular/core';
import { Sec1 } from '../Mainpage/sec1/sec1';
import { Sec2 } from '../Mainpage/sec2/sec2';
import { Sec3 } from '../Mainpage/sec3/sec3';

@Component({
  imports: [Sec1,Sec2,Sec3],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  template: ` 

    <app-sec1></app-sec1>
    <app-sec2></app-sec2>
    <app-sec3></app-sec3>
  `,
})
export class HomePageComponent {}
