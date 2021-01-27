import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('slideInOut', [
        state('in', style({
            overflow: 'hidden',
            height: '*',
            opacity: '1'
        })),
        state('out', style({
            opacity: '0',
            overflow: 'hidden',
            height: '0px',
        })),
        transition('in => out', animate('400ms ease-in-out')),
        transition('out => in', animate('400ms ease-in-out'))
    ])
]
})
export class MenuComponent implements OnInit {
  openProyect: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  get isOpenProyect(): boolean {
    return this.openProyect;
  }

}
