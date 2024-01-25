import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  productDataForm!: FormGroup
  brandData: any;
  categoryData: any;
  productId: any;
  editEnable: boolean = false;
  constructor(private brandService: BrandService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productDataForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      brandId: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
    });

    if (this.route.snapshot.params.id != undefined) {
      this.productId = this.route.snapshot.params.id;
      this.editEnable = true;
    }
    if (this.editEnable == true) {
      this.editproduct(this.productId)
    }
    this.getBrandData();
    this.getCategoryData();


  }
  getBrandData() {
    this.brandService.getBrand().subscribe((res => {
      this.brandData = res.result;
      this.totalRecords = res.result.length;
    }))
  }
  getCategoryData() {
    this.categoryService.getCategory().subscribe((res => {
      this.categoryData = res.result;
    }))
  }
  saveOrEditProduct(data: any) {
    let status=false;
    if(data.status=="true")status=true;
    let model = {
      "id": 0,
      "categoryId": data.categoryId,
      "brandId": data.brandId,
      "name": data.name,
      "status": status,
    }

    if (this.editEnable == false) {
      this.productService.addProducts(model).subscribe((res => {
        alert("Saved Successfully");
        this.productDataForm.reset();
      }))
    }
    else {

      model.id=data.id;
      this.productService.updateProduct(model).subscribe((res => {
        alert("Update Successfully");
        this.productDataForm.reset();
        this.editEnable=false;
        
      }))
    }

  }
  saveData(data: any) {

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
  editproduct(id: any) {
    this.productService.getProductById(id).subscribe((res => {
      this.productDataForm.patchValue(res.result);
      this.editEnable=true;
      //this.saveOrEditProduct(this.productDataForm.value);
    }))
  }



}
