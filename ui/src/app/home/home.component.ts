import { Component, OnInit } from '@angular/core';
import * as wordInfo from '../../../../task/match_words.json';
interface MatchWords {
  req: string,
  sel: string[],
  words: string[]
}

enum InputState {
  Normal,
  Correct,
  Error
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
  inputState:InputState = InputState.Normal;
  InputState = InputState;

  constructor() { }

  ngOnInit(): void {
    console.log("init");
  }

  setInputState(newState:InputState){
    this.inputState = newState;
    setTimeout(() => this.inputState = InputState.Normal, 1000);
  }

  validateWord() {
    if (!this.submittedWords.includes(this.inputValue) && this.wordData.words.includes(this.inputValue)) {
      this.submittedWords.push(this.inputValue);
      this.setInputState(InputState.Correct);
    }
    else {
      this.setInputState(InputState.Error);
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
