import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ParentModel} from '@core/models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private url = 'http://localhost:3000/api/mongo';
  constructor(private http: HttpClient) { }

  getAll(): Observable<ParentModel[]> {
    return this.http.get<ParentModel[]>(`${this.url}/parents`);
  }

  getById(id: number) {
    return this.http.get<ParentModel>(`${this.url}/parents/${id}`);
  }

  create(model: ParentModel) {
    return this.http.post(`${this.url}/parents`, model);
  }

  update(model: ParentModel) {
    return this.http.put(`${this.url}/parents/${model.id}`, model);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/parents/${id}`);
  }
}
