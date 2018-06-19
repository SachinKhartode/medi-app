import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../Shared/auth.service';
import { User } from '../Shared/User';
import { DataService } from "../Shared/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isUserLoggedIn: boolean = false;
  @Output() checkUserLoginEvent = new EventEmitter<boolean>();

  user: User = new User();
  constructor(private data: DataService, private router: Router, private auth: AuthService) {

  }

  ngOnInit() {
    this.data.currentMessage.subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn)
  }

  onLogin(): void {
    debugger;
    this.isUserLoggedIn = true;
        
    this.data.changeMessage(this.isUserLoggedIn);

    this.router.navigateByUrl('/employee-list');
    // this.auth.login(this.user)
    // .then((user) => {
    //   localStorage.setItem('token', user.json().auth_token);
    //   console.log(user.json());
    //   this.router.navigateByUrl('/employee-list');
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }
}
