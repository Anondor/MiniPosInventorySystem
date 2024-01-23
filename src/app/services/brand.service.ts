import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

   url: string = 'https://localhost:7257/api/Brand';
  constructor(private http: HttpClient) { }

  addBrand( data: any)
  {
    return this.http.post<any>(`${this.url}`,data);
    
  }
  getBrand()
  {
    return this.http.get<any>(`${this.url}`);
  }

  deleteBrand(id:any)
  {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  getBrandById(brandId:any)
  {
    return this.http.get<any>(`${this.url}/${brandId}`)
  }
  updateBrand(data:any)
  {
    return this.http.put<any>(`${this.url}`,data);

  }
}
