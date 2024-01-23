import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  totalRecords: any;

  constructor(private brandService:BrandService, private categoryService:CategoryService, private productService:ProductService) { }
  productDataForm!:FormGroup
  brandData:any;
  categoryData:any;
  ngOnInit(): void {
    this.productDataForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      brandId: new FormControl(null,Validators.required),
      categoryId:new FormControl(null,Validators.required),
    });
    this.getBrandData();
    this.getCategoryData();
 

  } 
  getBrandData()
  {
    this.brandService.getBrand().subscribe((res => {
      this.brandData = res.result;
      this.totalRecords=res.result.length;
    }))
  }
  getCategoryData()
  {
      this.categoryService.getCategory().subscribe((res=>{
        this.categoryData=res.result;
      }))
  }
    saveData(data:any)
    {
     
      let model = {
        "id": 0,
        "categoryId": data.categoryId,
        "brandId": data.brandId,
        "name": data.name,
        "status": true
      }

      this.productService.addProducts(model).subscribe((res => {
        alert("Saved Successfully");
        this.productDataForm.reset();
      }))
        
    }

}
