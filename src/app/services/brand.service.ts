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
}
