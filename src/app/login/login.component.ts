import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../Shared/auth.service';
import { User } from '../Shared/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public isUserLogin: boolean = false;
  @Output() checkUserLoginEvent = new EventEmitter<boolean>();

  user: User = new User();
  constructor(private router: Router, private auth: AuthService) {

  }

  ngOnInit() {
  }

  onLogin(): void {
    debugger;
    this.isUserLogin = true;
    this.checkUserLoginEvent.emit(this.isUserLogin);

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
