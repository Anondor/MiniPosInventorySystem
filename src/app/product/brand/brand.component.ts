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
  constructor(private brandService: BrandService) { }

  ngOnInit(): void {

    this.brandDataForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null,Validators.required),
      status: new FormControl(null,Validators.required),

    });
  }
  elements: any = [
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter' },
  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];
  saveData(brandName: string, brandStatus: string) {

    let status = true;
    if (brandStatus == 'false') status = false;

    let model = {
      "brandId": 0,
      "name": brandName,
      "status": status
    }

    this.brandService.addBrand(model).subscribe((res => {
      alert("Saved Successfully");
      this.brandDataForm.reset();
    }))

  }

}
