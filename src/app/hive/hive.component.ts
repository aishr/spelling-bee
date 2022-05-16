import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hive',
  templateUrl: './hive.component.html',
  styleUrls: ['./hive.component.css']
})
export class HiveComponent implements OnInit {
  @Input() letters: string[] = [];
  @Input() onPress!: (l:string) => void;

  constructor() { }

  ngOnInit(): void {
    console.log(this.onPress);
  }

}
