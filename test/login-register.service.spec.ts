import { async, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginRegisterService } from '../src/app/services/login-register.service';

describe('LoginRegisterService', () => {
  let service: LoginRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginRegisterService],
    });
    service = TestBed.get(LoginRegisterService);
  });


  it('should create', async(() => {
    expect(service).toBeTruthy();
  }));

  it('should have login function', async(() => {
    // Testcase to check function existence
    expect(service.login).toBeTruthy();
  }));

  it('should have register function', async(() => {
    // Testcase to check function existence
    expect(service.register).toBeTruthy();
  }));

  it('register function should post data to backend', () => {
    const registerUser = {
      email: 'mohit@email.com',
      password: 'mohit'
    }
    service.register(registerUser).subscribe();
    expect(registerUser.email).toEqual('mohit@email.com');
  });

  it('login function should return access_token', async((done) => {
    const payload = { email: 'bruno@email.com', password: 'bruno' };
    service.login(payload).subscribe((data) => {
      expect(data.access_token).toBeTruthy();
      done();
    });
  }));

});
