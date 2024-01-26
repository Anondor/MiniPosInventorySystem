import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  url: string = 'https://localhost:7257/api/Unit';

  constructor(private http: HttpClient) { }
  addUnit( data: any)
  {
    return this.http.post<any>(`${this.url}`,data);
  }
  getUnit()
  {
    return this.http.get<any>(`${this.url}`);
  }
  deleteUnit(id:any)
  {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  getUnitById(unitId:any)
  {
    return this.http.get<any>(`${this.url}/${unitId}`)
  }
  updateUnit(data:any)
  {
    return this.http.put<any>(`${this.url}`,data);

  }
}
