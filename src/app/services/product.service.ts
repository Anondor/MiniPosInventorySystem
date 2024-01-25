import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = 'https://localhost:7257/api/Product';


  constructor(private http: HttpClient) { }

  getProducts()
  {
    return this.http.get<any>(`${this.url}`);
  }
  addProducts(data:any)
  {
    return this.http.post<any>(`${this.url}`,data);
  }
  deleteProduct(id:any)
  {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  getProductById(id:any)
  {
    return this.http.get<any>(`${this.url}/${id}`)
  }
  updateProduct(data:any)
  {
    debugger
    return this.http.put<any>(`${this.url}`,data);

  }
}
