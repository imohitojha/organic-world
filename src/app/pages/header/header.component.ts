import { Customer } from 'src/app/modals/customer';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { LoginRegisterService } from 'src/app/services/login-register.service';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { MustMatch } from './register.validator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
// Class to display header
export class HeaderComponent implements OnInit {
  @ViewChild('loginButton', { static: false }) openModal: ElementRef;
  isLoggedIn = false;
  user: Customer = {};
  hide;

  loginForm: FormGroup;
  registerForm: FormGroup;
  searchForm: FormGroup;

  constructor(
    private loginService: LoginRegisterService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.loggedInCheck();
  }

  // Function to check Login is successful and change tabs in the header using sessionStorage item 'token'
  loggedInCheck() {
    if (sessionStorage.getItem('token') !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  // Function to create formGroup for Login, Register and Search which are loginForm, registerForm, searchForm respectively.
  // with appropriate formControl for all formGroup and validators have to be included for loginForm and registerForm.
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );

    this.searchForm = this.fb.group({
      content: [''],
    });
  }

  // Function to navigate to products route 'products/search/' appended with search input
  search(post) {
    if (sessionStorage.getItem('token') === null) {
      this.openModal.nativeElement.click();
    }
    this.route.navigateByUrl('products/search/' + post.content);
  }

  //  Function to get user's credential and send to backend for authentication token
  //  store the authentication token in a sessionStorage item 'token' and
  //  if user account is crated get user details using accountService or
  //  else create a user account for registered user using addAccountDetails in accountService
  //  and store in a sessionStorage item 'user' and navigate to 'products/all'
  logIn(post) {
    this.loginService.login(post).subscribe((data) => {
      sessionStorage.setItem('token', data.access_token);
      this.isLoggedIn = true;
      this.accountService.getAccountDetails(post.email).subscribe((details) => {
        if (details[0] === undefined) {
          this.accountService.addAccountDetails(this.user).subscribe();
          sessionStorage.setItem('user', JSON.stringify(this.user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(details[0]));
        }
      }, (error) => console.log(error));
      this.route.navigateByUrl('products/all');
    }, (error) => console.log(error));
  }

  // Function to register an user,initialize user variable and open the login modal
  register(post) {
    delete post.confirmPassword;
    this.loginService.register(post).subscribe();
    this.user.id = '' + Math.random();
    this.user.firstName = 'mockFirstName';
    this.user.lastName = 'mockLastName';
    this.user.email = post.email;
    this.user.password = post.password;
    this.hide = true;
    $(document.body).removeClass('modal-open');
    $('.modal-backdrop').remove();
    this.openModal.nativeElement.click();
  }

  // Function to clear all sessionStorage  items and reload to landing page
  signOut() {
    sessionStorage.clear();
    location.reload();
  }

  ngOnDestroy(): void {
    $(document.body).removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
}
