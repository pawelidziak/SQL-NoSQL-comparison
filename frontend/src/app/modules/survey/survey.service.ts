import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestModel, SurveyResult} from '@core/models';

@Injectable()
export class SurveyService {
  private url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  createMany(req: RequestModel): Observable<SurveyResult> {
    return this.http.post<SurveyResult>(`${this.url}/createMany`, req);
  }

  readNoIndexes(req: RequestModel): Observable<SurveyResult> {
    return this.http.post<SurveyResult>(`${this.url}/readNoIndexes`, req);
  }

  readWithIndexes(req: RequestModel): Observable<SurveyResult> {
    return this.http.post<SurveyResult>(`${this.url}/readWithIndexes`, req);
  }

  updateMany(req: RequestModel): Observable<SurveyResult> {
    return this.http.post<SurveyResult>(`${this.url}/updateMany`, req);
  }

  deleteMany(req: RequestModel): Observable<SurveyResult> {
    return this.http.post<SurveyResult>(`${this.url}/deleteMany`, req);
  }

}
