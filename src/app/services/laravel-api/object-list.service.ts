import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  //BACK-END  
  private apiUrl='http://127.0.0.1:8000/api/drone'
  
  constructor(public http: HttpClient) { }


  getObjects(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
  }
}
