import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brandDataForm!: FormGroup;
  brandData: any;
  brandDataId: any;
  isedit:boolean=false;
  totalRecords:number=0;
  headElements = ['#', 'Name', 'Status', 'Action'];

  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.brandDataForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });
    this.getBrandData();
  }

  saveData(brandName: string, brandStatus: string) {
    brandName = brandName.trim();
    let status = true;
    if (brandStatus == 'false') status = false;
    brandName = brandName.toLowerCase();
    let model = {
      "brandId": 0,
      "name": brandName,
      "status": status
    }
    let isExist = false;
    this.brandData.forEach((element: any) => {

      if (brandName == element.name) {
        isExist = true;
        alert("this brand is already exist");
      }
    });
    if (isExist == false) {
      this.saveOrEditBrand(model);
    }
  }
  saveOrEditBrand(model: any) {
    if (this.isedit == false) {
      this.brandService.addBrand(model).subscribe((res => {
        alert("Saved Successfully");
        this.brandDataForm.reset();
      }))
      this.getBrandData();
    }

    else {
      model.brandId=this.brandDataId;
      this.brandService.updateBrand(model).subscribe((res => {
        alert("Update Successfully");
        this.brandDataForm.reset();
        this.isedit = false;
      }))
    }
  }
  getBrandData() {
    this.brandService.getBrand().subscribe((res => {
      this.brandData = res.result;
      this.totalRecords=res.result.length;
    }))
  }
  deleteBrandData(id: any) {
    this.brandService.deleteBrand(id).subscribe((res => {
      this.brandData.splice(this.brandData.findIndex((a: { brandId: any; }) => a.brandId === id), 1)
    }))
  }
  editBrandData(brandId: any) {
    this.brandService.getBrandById(brandId).subscribe((res => {
      this.brandDataForm.patchValue(res.result);
      this.brandDataId=brandId;

      let model = {
        "brandId": 0,
        "name": this.brandDataForm.value.name,
        "status": this.brandDataForm.value.status

      }
      this.isedit=true;
    }))


  }

}

