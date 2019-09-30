import { Component } from '@angular/core';

@Component({
  selector: 'app-root', //this is the selector index.html uses to display content
  templateUrl: './app.component.html', //connects to main component html
  styleUrls: ['./app.component.css'] //conntect to main component css (in this case empty)
})
export class AppComponent { //create the class
  title = 'HW4 Paige Jones CS 701'; //title 
}
