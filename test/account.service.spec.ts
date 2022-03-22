import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AccountService } from '../src/app/services/account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AccountService],
    });
    service = TestBed.get(AccountService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getAccountDetails method', () => {
    expect(service.getAccountDetails).toBeTruthy();
  });

  it('should have updateAccountDetails method', () => {
    expect(service.updateAccountDetails).toBeTruthy();
  });

  it('should get account details using getAccountDetails function', () => {
    // Testcase to check whether function returns account details of a customer of email 'bruno@email.com'
    // Use httpTestingController to create a mock backend to return a value(customer)
    // mock backend should also check the header for Authorization key and also the method of the request
    const customer = {
      "id": "1",
      "firstName": "bruno",
      "lastName": "mars",
      "email": "bruno@email.com",
      "password": "bruno"
    };
    const payload = 'bruno@email.com';

    service.getAccountDetails(payload).subscribe((data) => {
      expect(data[0]).toEqual(customer);
    });

    const req = httpMock.expectOne(`${service.API_URL}/customers?email=${payload}`);
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.method).toBe("GET");
    httpMock.verify();
  });

  it('should update users account using updateAccountDetails function', () => {
    // Testcase to check whether function send a value(customer) changed to backend
    // Use httpTestingController to create a mock backend to check whether sent customer from return-data.ts modified is correct
    // mock backend should also check the header for Authorization key and also the method of the request
    const customer = {
      "id": "1",
      "firstName": "bruno",
      "lastName": "mars",
      "email": "bruno@email.com",
      "password": "bruno"
    };

    service.updateAccountDetails(customer).subscribe((data) => {
      expect(data[0]).toEqual(customer);
    });

    const req = httpMock.expectOne(`${service.API_URL}/customers/${customer.id}`);
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.method).toBe("PUT");
    httpMock.verify();
  });

  it('should create users account using addAccountDetails method', () => {
    // Testcase to check whether function send a value(customer) from return-data.ts to backend
    // Use httpTestingController to create a mock backend to check whether sent customer is correct
    // mock backend should also check the header for Authorization key and also the method of the request
    const customer = {
      "id": "1",
      "firstName": "bruno",
      "lastName": "mars",
      "email": "bruno@email.com",
      "password": "bruno"
    };

    service.addAccountDetails(customer).subscribe((data) => {
      expect(data[0]).toEqual(customer);
    });

    const req = httpMock.expectOne(`${service.API_URL}/customers`);
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.method).toBe("POST");
    httpMock.verify();
  });

});
