import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Product[];

  constructor() { }

  ngOnInit() {
  }

}
