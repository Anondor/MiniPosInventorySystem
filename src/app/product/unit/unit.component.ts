import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  unitDataForm!: FormGroup;
  unitData: any;
  unitDataId: any;
  isedit: boolean = false;
  totalRecords: number = 0;
  headElements = ['#', 'Name', 'Status', 'Action'];
  constructor(private unitService: UnitService) {
  }
  ngOnInit(): void {
    this.unitDataForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });
    this.getUnitData();
  }
  saveData(unitName: string, unitStatus: string) {
    unitName = unitName.trim();
    let status = true;
    if (unitStatus == 'false') status = false;
    //  categoryName =  unitName.toLowerCase();
    let model = {
      "unitId": 0,
      "name": unitName,
      "status": status
    }
    let isExist = false;
    if (this.unitDataId == undefined) {
      this.unitData.forEach((element: any) => {

        if (unitName == element.name) {
          isExist = true;
          alert("this category is already exist");
        }
      });
    }
    if (isExist == false) {
      this.saveOrEditUnit(model);
    }
  }
  saveOrEditUnit(model: any) {
    if (this.isedit == false) {
      this.unitService.addUnit(model).subscribe((res => {
        alert("Saved Successfully");
        this.unitDataForm.reset();
        this.unitData.push(model);
      }))
    }
    else {
      model.unitId = this.unitDataId;
      this.unitService.updateUnit(model).subscribe((res => {
        alert("Update Successfully");
        this.unitDataForm.reset();
        this.isedit = false;
        for (let index = 0; index < this.unitData.length; index++) {
          if (this.unitData[index].unitId == model.unitId) this.unitData[index] = model;
        }
      }))
    }
  }
  getUnitData() {
    this.unitService.getUnit().subscribe((res => {
      this.unitData = res.result;
      this.totalRecords = res.result.length;
    }))
  }
  deleteUnitData(id: any) {
    this.unitService.deleteUnit(id).subscribe((res => {
      this.unitData.splice(this.unitData.findIndex((a: { unitId: any; }) => a.unitId === id), 1)
    }))
  }
  editUnitData(unitId: any) {
    this.unitService.getUnitById(unitId).subscribe((res => {
      this.unitDataForm.patchValue(res.result);
      this.unitDataId = unitId;

      let model = {
        "unitId": 0,
        "name": this.unitDataForm.value.name,
        "status": this.unitDataForm.value.status

      }
      this.isedit = true;
    }))
  }
}
