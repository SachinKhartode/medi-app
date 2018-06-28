import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ToasterService} from 'angular2-toaster';

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
  public themeColor:string;

  @Output() checkUserLoginEvent = new EventEmitter<boolean>();
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  //user: User = new User();

  constructor
  (
      private data: DataService, 
      private router: Router, 
      private auth: AuthService,
      private toastr: ToasterService,
      private formBuilder: FormBuilder,
  ) {}
  
  ngOnInit() 
  {
    this.loading = false;
    this.createForm();
    localStorage.removeItem('currentUser');

    this.data.currentMessage.subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn);
    this.data.userCurrentMessage.subscribe(LoggedInUserName => this.LoggedInUserName = LoggedInUserName);
    this.data.colorCurrentMessage.subscribe(themeColor => this.themeColor = themeColor)
  }

  private createForm() 
  {
    // this.loginForm = new FormGroup({
    //   //email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    //   userId: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required),
    // });
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onLogin(): void 
  {debugger;
    console.log(this.loginForm.value);
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.auth.login(this.loginForm.value)
    .then((response) => {
      if(response["_body"] != undefined)
      {
        localStorage.setItem('currentUser', response["_body"]);
        console.log(response["_body"]);
        this.router.navigateByUrl('/employee-list');
        this.toastr.pop('success', 'Login', 'You login in successfully.');

        this.isUserLoggedIn = true;
        this.data.changeMessage(this.isUserLoggedIn);
      
        this.LoggedInUserName = response["_body"];
        this.data.changeUser(this.LoggedInUserName);
      }
      else{
        this.toastr.pop('error', 'Login', 'User Id does not exists.');
      }
    })
    .catch((err) => { 
      console.log(err);
      this.router.navigateByUrl('/login');
      this.toastr.pop('error', 'Login', 'Login failed.');
      this.loading = false;
    });
    //this.loading = false;
   // this.createForm();
  }

}
