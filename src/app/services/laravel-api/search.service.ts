import { Injectable, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, tap } from 'rxjs';
import * as InstancesInterfaces from '../../shared/InstancesInterfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = "http://localhost:8000/api/allTables/search?string="
  private objectsMap = new Map<keyof InstancesInterfaces.AllTypes, {
    all: WritableSignal<InstancesInterfaces.AllTypes[]>;
  }>();

  constructor(private http: HttpClient) { }
  getObjects(search: string): Observable<Record<string, InstancesInterfaces.AllTypes[]>> {
    return this.http.get<Record<string, InstancesInterfaces.AllTypes[]>>(`${this.apiUrl}${search}`).pipe(
      tap((data) => {
        Object.keys(data).forEach((key) => {
          const type = key as keyof InstancesInterfaces.AllTypes;
          if (this.objectsMap.has(type)) {
            this.objectsMap.get(type)!.all.set(data[type]);
          }
        });
      })
    );
  }

}
