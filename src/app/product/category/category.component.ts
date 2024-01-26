import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryDataForm!: FormGroup;
  categoryData: any;
  categoryDataId: any;
  isedit: boolean = false;
  totalRecords: number = 0;
  headElements = ['#', 'Name', 'Status', 'Action'];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryDataForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });
    this.getCategoryData();
  }

  saveData(categoryName: string, categoryStatus: string) {
    categoryName = categoryName.trim();
    let status = true;
    if (categoryStatus == 'false') status = false;
    categoryName = categoryName.toLowerCase();
    let model = {
      "categoryId": 0,
      "name": categoryName,
      "status": status
    }
    let isExist = false;
    if (this.categoryDataId == undefined) {
      this.categoryData.forEach((element: any) => {

        if (categoryName == element.name) {
          isExist = true;
          alert("this category is already exist");
        }
      });
    }

    if (isExist == false) {
      this.saveOrEditCategory(model);
    }
  }
  saveOrEditCategory(model: any) {
    if (this.isedit == false) {
      this.categoryService.addCategory(model).subscribe((res => {
        alert("Saved Successfully");
        this.categoryDataForm.reset();
        this.categoryData.push(model);
      }))
    }
    else {
      model.categoryId = this.categoryDataId;
      this.categoryService.updateCategory(model).subscribe((res => {
        alert("Update Successfully");
        this.categoryDataForm.reset();
        this.isedit = false;
        for (let index = 0; index < this.categoryData.length; index++) {
          if (this.categoryData[index].categoryId == model.categoryId) this.categoryData[index] = model;
        }
      }))
    }
  }
  getCategoryData() {
    this.categoryService.getCategory().subscribe((res => {
      this.categoryData = res.result;
      this.totalRecords = res.result.length;
    }))
  }
  deleteCategoryData(id: any) {
    this.categoryService.deleteCategory(id).subscribe((res => {
      this.categoryData.splice(this.categoryData.findIndex((a: { categoryId: any; }) => a.categoryId === id), 1)
    }))
  }
  editCategoryData(brandId: any) {
    this.categoryService.getCategoryById(brandId).subscribe((res => {
      this.categoryDataForm.patchValue(res.result);
      this.categoryDataId = brandId;

      let model = {
        "categoryId": 0,
        "name": this.categoryDataForm.value.name,
        "status": this.categoryDataForm.value.status

      }
      this.isedit = true;
    }))


  }

}
