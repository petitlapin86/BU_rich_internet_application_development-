import { Component, OnInit } from '@angular/core';

@Component({ //this is a decorator
  selector: 'app-part2', //define a selector to be found by the app.component.ts
  templateUrl: './part2.component.html', //connect to html
  styleUrls: ['./part2.component.css'] //connect to css
})
export class Part2Component implements OnInit { //this is a class
   filterIt: string; //could given property value any, number, string etc.
   delimiter: string;

  constructor() { //this is a constructor within the class Part2Component
    this.filterIt = 'Your message here'; //default message
   this.delimiter = '#'; //default delimiter
  }

  ngOnInit() {
  }

}
