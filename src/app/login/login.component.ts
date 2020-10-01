import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor() { }
  loginForm: FormGroup;
  hide: boolean = true;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', [])
    });
  }
  onLogin() {

  }
}
