import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inputValue:string = "";

  foo(){
    console.log(this.inputValue);
  }

  constructor() { }

  ngOnInit(): void {
  }

  addToValue(value:string){
    this.inputValue += value;
  }
}
