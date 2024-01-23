import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = 'https://localhost:7257/api/Category';

  constructor(private http: HttpClient) { }
  getCategory()
  {
    return this.http.get<any>(`${this.url}`);
  }
}
