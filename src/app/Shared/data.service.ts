import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  //for User Is Login Flag
  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  //for User Name
  private userMessageSource = new BehaviorSubject("");
  userCurrentMessage = this.userMessageSource.asObservable();

  //for theam color
  private colorMessageSource = new BehaviorSubject("red");
  colorCurrentMessage = this.colorMessageSource.asObservable();

  constructor() { }

  changeMessage(isUserLoggedIn: boolean) {
    this.messageSource.next(isUserLoggedIn)
  }

  changeUser(LoggedInUserName: string) {
    this.userMessageSource.next(LoggedInUserName)
  }

  changeColor(themeColor: string) {
    this.colorMessageSource.next(themeColor)
  }

}
