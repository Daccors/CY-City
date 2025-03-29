import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { bike, drone } from '../../shared/InstancesInterfaces';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  //BACK-END  
  private dronesUrl = 'http://127.0.0.1:8000/api/drone';
  private bikesUrl = 'http://127.0.0.1:8000/api/bike';

  drones = signal<drone[]>([]);
  uniqueDrone = signal<drone | null>(null);

  bikes = signal<bike[]>([]);
  uniqueBike = signal<bike | null>(null);

  constructor(public http: HttpClient) { }

  //Drones
  getDrones(): Observable<drone[]> {
    return this.http.get<drone[]>(this.dronesUrl).pipe(
      tap((drones) => { this.drones.set(drones); })
    );
  }
  getDroneById(id: number): Observable<drone> {
    return this.http.get<drone>(`${this.dronesUrl}/${id}`).pipe(
      tap((uniqueDrone) => {
        this.uniqueDrone.set(uniqueDrone);
      })
    );
  }

  //Bikes

  getBikes(): Observable<bike[]> {
    return this.http.get<bike[]>(this.bikesUrl).pipe(
      tap((bikes) => { this.bikes.set(bikes); })
    );
  }
  getBikeById(id: number): Observable<bike> {
    return this.http.get<bike>(`${this.bikesUrl}/${id}`).pipe(
      tap((uniqueBike) => {
        this.uniqueBike.set(uniqueBike);
      })
    );
  }
}
