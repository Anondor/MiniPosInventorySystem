import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }
  headElements = ['#', 'Name', 'Status', 'Brand', 'Category', 'Action'];
  productData: any;

  ngOnInit(): void {
    this.getProductData();
  }
  getProductData() {
    this.productService.getProducts().subscribe((res => {
      this.productData = res.result;
    }))
  }
  newProductPage() {
    this.router.navigate(['new-product']);
  }
  deleteProductData(id: any) {
    this.productService.deleteProduct(id).subscribe((res => {
      this.productData.splice(this.productData.findIndex((a: { id: any; }) => a.id === id), 1)
    }))
  }


}
