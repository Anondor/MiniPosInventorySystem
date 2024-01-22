import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { BrandComponent } from './product/brand/brand.component';
import { UnitComponent } from './product/unit/unit.component';
import { CategoryComponent } from './product/category/category.component';

const routes: Routes = [
 // {path:'',component:HomeComponent},
  {path:'product',component:ProductComponent},
  {path:'brand',component:BrandComponent},
  {path:'unit',component:UnitComponent},
  {path:'category',component:CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
