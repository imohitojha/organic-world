import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';

import { ProductService } from '../src/app/services/product.service';
import { LoginRegisterService } from 'src/app/services/login-register.service';

describe('ProductService', () => {
  const payload = { email: 'bruno@email.com', password: 'bruno' };
  let fakeLogin: LoginRegisterService;
  let service: ProductService;

  beforeEach( async (() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductService, LoginRegisterService],
    });
    fakeLogin = TestBed.get(LoginRegisterService);
    service = TestBed.get(ProductService);
    fakeLogin.login(payload).subscribe((data) => {
      sessionStorage.setItem('token', data.access_token);
    });
  }));

  afterEach( async( () => sessionStorage.clear()));

  it('should be created', async( () => {
    expect(service).toBeTruthy();
  }));

  it('should have getAllProducts method', async( () => {
    expect(service.getAllProducts).toBeTruthy();
  }));

  it('should have getProductByCategory method', async( () => {
    expect(service.getProductsByCategory).toBeTruthy();
  }));

  it('should get 9 items of category fruits', (done) => {
    service.getProductsByCategory('fruit').subscribe((data) => {
      expect(data.length).toBe(9);
      expect(data[0].category).toEqual('fruit');
      done();
    });
  });

  it('should get all 34 items', (done) => {
    service.getAllProducts().subscribe((data) => {
      expect(data.length).toBe(34);
      done();
    });
  });
});
