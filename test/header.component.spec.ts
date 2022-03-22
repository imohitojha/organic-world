import { LoginRegisterService } from 'src/app/services/login-register.service';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '../src/app/pages/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { token } from './return-data';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let service: LoginRegisterService;
  let fixture: ComponentFixture<HeaderComponent>;
  const payload = { email: 'bruno@email.com', password: 'bruno' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: HeaderComponent,
          },
        ]),
        HttpClientModule,
      ],
      providers: [LoginRegisterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    service = TestBed.get(LoginRegisterService);
    spyOn(service, 'register').and.returnValue(of(''))
    service.login(payload).subscribe((data) => {
      sessionStorage.setItem('token', data.access_token);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have createForm function', () => {
    // Testcase to check function existence
    expect(component.createForm).toBeTruthy();
  });

  it('should have login function', () => {
    // Testcase to check function existence
    expect(component.logIn).toBeTruthy();
  });

  it('should have register function', () => {
    // Testcase to check function existence
    expect(component.register).toBeTruthy();
  });

  it('should have search function', () => {
    // Testcase to check function existence
    expect(component.search).toBeTruthy();
  });

  it('should have singOut method', () => {
    // Testcase to check function existence
    expect(component.signOut).toBeTruthy();
  });

  it('should have loggedInCheck function', () => {
    // Testcase to check function existence
    expect(component.loggedInCheck).toBeTruthy();
  });

  it('should have loginForm', () => {
    // Testcase to check formGroup existence
    expect(component.loginForm).toBeTruthy();
  });

  it('should have registerForm', () => {
    // Testcase to check formGroup existence
    expect(component.registerForm).toBeTruthy();
  });

  it('should have searchForm', () => {
    // Testcase to check formGroup existence
    expect(component.searchForm).toBeTruthy();
  });

  it('loginForm invalid when empty', () => {
    // Write logic here
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('registerForm invalid when empty', () => {
    // Write logic here
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('loginForm email field validity', () => {
    // Write logic here
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();let errors = {};
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('registerForm email field validity', () => {
    // Write logic here
    const email = component.registerForm.controls.email;
    expect(email.valid).toBeFalsy();
    let errors = {};
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('login function authentication', () => {
    // Testcase to check whether function authenticate and store token in sessionStorage
    // Use spyOn to give a value or mock functions of service
    component.loginForm.controls.email.setValue('bruno@email.com');
    component.loginForm.controls.password.setValue('bruno');
    component.logIn(component.loginForm.value);
    expect(sessionStorage.getItem('token')).toBeTruthy();
  });

  it('should create new user using register function', () => {
    // Testcase to check whether function register a new user
    // Use spyOn to mock a function of service
    const registerUser = {
      email: 'mohit@email.com',
      password: 'mohit'
    }
    component.registerForm.controls.email.setValue('mohit@email.com');
    component.registerForm.controls.password.setValue('mohit');
    service.register(component.registerForm.value).subscribe();
    expect(component.registerForm.value.email).toEqual(registerUser.email);
  });
});
