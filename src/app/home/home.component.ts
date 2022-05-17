import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inputValue: string = "";

  constructor() { }

  ngOnInit(): void {
    console.log("init");
  }

  foo() {
    console.log(this.inputValue);
  }

  addToValue = (value:string) => {
    this.inputValue += value;
  }
}
