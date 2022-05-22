import { Component, OnInit } from '@angular/core';
import * as wordInfo from '../../../../task/match_words.json';
interface MatchWords {
  req: string,
  sel: string[],
  words: string[]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inputValue: string = "";
  wordData:MatchWords = wordInfo;
  submittedWords:string[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log("init");
  }

  validateWord() {
    if (!this.submittedWords.includes(this.inputValue) && this.wordData.words.includes(this.inputValue)) {
      this.submittedWords.push(this.inputValue);
    }
    this.inputValue = "";
  }

  backspace() {
    this.inputValue = this.inputValue.slice(0, this.inputValue.length - 1);
  }

  shuffle() {
    this.wordData.sel = this.wordData.sel.sort((a, b) => 0.5 - Math.random());
  }

  addToValue = (value:string) => {
    this.inputValue += value;
  }
}
