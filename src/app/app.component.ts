import { Component, OnInit } from '@angular/core';
import * as Plot from '@observablehq/plot';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'intervals-charts';

  ngOnInit(): void {
    console.log(Plot.plot())
  }
}
