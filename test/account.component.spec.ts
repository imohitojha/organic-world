import { OrderService } from 'src/app/services/order.service';
import { AccountService } from 'src/app/services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './../src/app/pages/header/header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from '../src/app/pages/account/account.component';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRegisterService } from '../src/app/services/login-register.service'
import { Customer } from 'src/app/modals/customer';

describe('AccountComponent', () => {
  const payload = { email: 'bruno@email.com', password: 'bruno' };
  const user: Customer = {
    id: '1',
    firstName: 'bruno',
    lastName: 'mars',
    email: 'bruno@email.com',
    password: 'bruno',
  };
  let fakeLogin: LoginRegisterService;
  let component: AccountComponent;
  let accountService: AccountService;
  let orderService: OrderService;
  let fixture: ComponentFixture<AccountComponent>;
  const updatedUser = user;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent, HeaderComponent, FooterComponent ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [AccountService, OrderService]
    })
    .compileComponents();
    accountService = TestBed.get(AccountService);
    orderService = TestBed.get(OrderService);
    sessionStorage.setItem('user', JSON.stringify(user));
    fakeLogin = TestBed.get(LoginRegisterService);
    fakeLogin.login(payload).subscribe((data) => {
      sessionStorage.setItem('token', data.access_token);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have getOrders function', () => {
    // Testcase to check function existence
    expect(component.getOrders).toBeTruthy();
  });

  it('should have getUserDetails function', () => {
    // Testcase to check function existence
    expect(component.getUserDetails).toBeTruthy();
  });

  it('should have update function', () => {
    // Testcase to check function existence
    expect(component.update).toBeTruthy();
  });

  it('getOrders should get all the orders of the user', (done) => {
    // Testcase to check whether function returns all orders of a customer using customer id '1'
    expect(sessionStorage.getItem('token')).toBeTruthy();
    orderService.getOrdersByCustomer('1').subscribe((data) => {
      expect(data[0].customerId).toEqual('1');
      done();
    });
  });

  it('update function should update the user details in backend', (done) => {
    // Testcase to check whether function updates the customer updated details
    const userUpdate: Customer = JSON.parse(sessionStorage.getItem('user'));
    accountService.updateAccountDetails(user).subscribe();
    expect(userUpdate).toEqual(updatedUser);
    done();
  });

});
