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
  Error,
  Repeat
}

interface LocalStorageState {
  submittedWords: string[],
  letters: string[]
}
const localStorageKey = "spelling-bee";
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

    const existingStorage = localStorage.getItem(localStorageKey);
    if (!existingStorage){return;}
    const existingState:LocalStorageState = JSON.parse(existingStorage);
    const letters = [this.wordData.req,...this.wordData.sel];
    if (letters.length == existingState.letters.length && letters.every((l) => existingState.letters.includes(l))){
      this.submittedWords = existingState.submittedWords;
    }
  }

  setInputState(newState:InputState){
    this.inputState = newState;
    setTimeout(() => this.inputState = InputState.Normal, 1000);
  }

  validateWord() {
    if (this.submittedWords.includes(this.inputValue)) {
      this.setInputState(InputState.Repeat);
    }
    else if (this.wordData.words.includes(this.inputValue)) {
      this.submittedWords.push(this.inputValue);
      this.setInputState(InputState.Correct);
      const newState:LocalStorageState = {
        letters:[this.wordData.req,...this.wordData.sel],
        submittedWords: this.submittedWords 
      };
      localStorage.setItem(localStorageKey, JSON.stringify(newState));
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
