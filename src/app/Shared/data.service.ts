import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(isUserLoggedIn: boolean) {
    debugger;
    this.messageSource.next(isUserLoggedIn)
  }

}
