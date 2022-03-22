import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';

import { OrderService } from '../src/app/services/order.service';
import { LoginRegisterService } from 'src/app/services/login-register.service';
import { order } from './return-data';

describe('OrderService', () => {
  let service: OrderService;
  let fakeLogin: LoginRegisterService;
  const payload = { email: 'bruno@email.com', password: 'bruno' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoginRegisterService, OrderService],
    });
    fakeLogin = TestBed.get(LoginRegisterService);
    service = TestBed.get(OrderService);
    fakeLogin.login(payload).subscribe((data) => {
      sessionStorage.setItem('token', data.access_token);
    });
  }));

  afterEach( async(() => sessionStorage.clear()));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should have addOrders function', () => {
    // Testcase to check function existence
    expect(service.addOrders).toBeTruthy();
  });

  it('should have getOrdersByCustomer function', () => {
    // Testcase to check function existence
    expect(service.getOrdersByCustomer).toBeTruthy();
  });

  it('getOrdersByCustomer function should get all orders of a customer', (done) => {
    expect(sessionStorage.getItem('token')).toBeTruthy();
    service.getOrdersByCustomer('1').subscribe((data) => {
      expect(data[0].customerId).toEqual('1');
      done();
    });
  });

  it('addOrders function should add a order to backend', (done) => {
    service.addOrders(order).subscribe((data) => {
      expect(data.customerId).toEqual('1');
      done();
    });
  });

});
