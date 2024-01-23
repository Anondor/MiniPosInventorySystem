import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService:ProductService) { }
  headElements = ['#', 'Name', 'Status', 'Brand','Category','Action'];
  productData:any;

  ngOnInit(): void {
    this.getProductData();
  }
  getProductData()
  {
    this.productService.getProduct().subscribe((res => {
      this.productData = res.result;
      console.log(this.productData);
      debugger
    }))

  }

}
