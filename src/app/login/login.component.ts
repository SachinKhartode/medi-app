import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  public LoggedInUserName: string = "";

  @Output() checkUserLoginEvent = new EventEmitter<boolean>();
  loginForm: FormGroup;

  user: User = new User();
  constructor(private data: DataService, private router: Router, private auth: AuthService) {

  }

  ngOnInit() {
    this.createForm();

    this.data.currentMessage.subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn);
    this.data.userCurrentMessage.subscribe(LoggedInUserName => this.LoggedInUserName = LoggedInUserName);
  }

   private createForm() {
    this.loginForm = new FormGroup({
      //email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      userId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin(): void {
    
    console.log(this.loginForm.value);

    this.isUserLoggedIn = true;
    this.data.changeMessage(this.isUserLoggedIn);
    
    this.LoggedInUserName = "Sachin Khartode";
    this.data.changeUser(this.LoggedInUserName);

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
