import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.css']
})
export class HexagonComponent implements OnInit {
  @Input() color: string = "text-gray-300";
  @Input() letter: string = "";
  @Input() onPress!: (l:string) => void;

  constructor() { }

  ngOnInit(): void {
  }

  shitPants(){
    this.onPress(this.letter);
  }

}
