import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = 'https://localhost:7257/api/Category';

  constructor(private http: HttpClient) { }
  addCategory( data: any)
  {
    return this.http.post<any>(`${this.url}`,data);
  }
  getCategory()
  {
    return this.http.get<any>(`${this.url}`);
  }
  deleteCategory(id:any)
  {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  getCategoryById(brandId:any)
  {
    return this.http.get<any>(`${this.url}/${brandId}`)
  }
  updateCategory(data:any)
  {
    return this.http.put<any>(`${this.url}`,data);

  }
}
