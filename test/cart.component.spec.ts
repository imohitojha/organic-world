import { OrderService } from 'src/app/services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './../src/app/pages/header/header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from '../src/app/pages/cart/cart.component';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { cart, user, order } from './return-data';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CartComponent', () => {
  let component: CartComponent;
  let orderService: OrderService;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent, HeaderComponent, FooterComponent ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [OrderService]
    })
    .compileComponents();
    orderService = TestBed.get(OrderService);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('user', JSON.stringify(user));
    spyOn(orderService, 'addOrders').and.returnValue(of(''));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have calculateTotal function', () => {
    // Testcase to check function existence
    expect(component.calculateTotal).toBeTruthy();
  });

  it('should have getCart function', () => {
    // Testcase to check function existence
    expect(component.getCart).toBeTruthy();
  });

  it('should have removeProduct function', () => {
    // Testcase to check function existence
    expect(component.removeProduct).toBeTruthy();
  });

  it('should have updateQuantity function', () => {
    // Testcase to check function existence
    expect(component.updateQuantity).toBeTruthy();
  });

  it('should have checkOut function', () => {
    // Testcase to check function existence
    expect(component.checkOut).toBeTruthy();
  });

  it('calculateTotal function calculates total and subTotal', () => {
    // Testcase to check whether function to calulate total
    component.ngOnInit();
    component.calculateTotal();
    expect(component.total).toEqual(4486);
    expect(component.subTotal[0]).toEqual(3430);
    expect(component.subTotal[1]).toEqual(1056);
  });

  it('removeProduct function to remove first item in cart', () => {
    // Testcase to check whether function removes item from cart
    component.ngOnInit();
    component.removeProduct(0);
    expect(component.total).toEqual(1056);
    expect(component.subTotal[0]).toEqual(1056);
  });

  it('removeProduct function to remove an item in cart', () => {
    // Testcase to check whether function removes item from cart
    component.ngOnInit();
    component.removeProduct(1);
    expect(component.total).toEqual(3430);
    expect(component.subTotal[0]).toEqual(3430);
  });

  it('checkOut function to add Order to backend', () => {
    // Testcase to check whether function adds a new order
    // Use spyOn to mock a function of service
    component.ngOnInit();
    component.checkOut();
    expect(component.order).toEqual(order);
  });

});
