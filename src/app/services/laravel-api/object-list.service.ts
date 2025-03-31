import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import * as InstancesInterfaces from '../../shared/InstancesInterfaces';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  public objTypes: (keyof InstancesInterfaces.ObjectTypes)[] = ['drone', 'bike', 'screen', 'bin', 'lamp', 'parking'];
  private apiUrl = 'http://127.0.0.1:8000/api/';
  private objectsMap = new Map<keyof InstancesInterfaces.ObjectTypes, {
    all: WritableSignal<InstancesInterfaces.ObjectTypes[keyof InstancesInterfaces.ObjectTypes][]>;
    unique: WritableSignal<InstancesInterfaces.ObjectTypes[keyof InstancesInterfaces.ObjectTypes] | null>;
  }>();

  constructor(private http: HttpClient) {
    this.initObjectTypes(this.objTypes);
  }

  private initObjectTypes(types: (keyof InstancesInterfaces.ObjectTypes)[]) {
    types.forEach(type => {
      this.objectsMap.set(type, {
        all: signal<any[]>([]),
        unique: signal<any | null>(null)
      });
    });
  }

  registerObjectType<T extends keyof InstancesInterfaces.ObjectTypes>(type: T) {
    if (!this.objectsMap.has(type)) {
      this.objectsMap.set(type, {
        all: signal<InstancesInterfaces.ObjectTypes[T][]>([]),
        unique: signal<InstancesInterfaces.ObjectTypes[T] | null>(null)
      });
    }
  }

  getObjects<T extends keyof InstancesInterfaces.ObjectTypes>(type: T, url: string): Observable<InstancesInterfaces.ObjectTypes[T][]> {
    this.registerObjectType(type);

    return this.http.get<InstancesInterfaces.ObjectTypes[T][]>(url).pipe(
      tap((data) => {
        this.objectsMap.get(type)!.all.set(data);
      })
    );
  }


  getObjectById<T extends keyof InstancesInterfaces.ObjectTypes>(type: T, url: string, id: number): Observable<InstancesInterfaces.ObjectTypes[T]> {
    this.registerObjectType(type);

    return this.http.get<InstancesInterfaces.ObjectTypes[T]>(`${url}/${id}`).pipe(
      tap((data) => {
        this.objectsMap.get(type)!.unique.set(data);
      })
    );
  }

  getAllObjects<T extends keyof InstancesInterfaces.ObjectTypes>(type: T) {
    return this.objectsMap.get(type)?.all || signal<InstancesInterfaces.ObjectTypes[T][]>([]);
  }

  getUniqueObject<T extends keyof InstancesInterfaces.ObjectTypes>(type: T) {
    return this.objectsMap.get(type)?.unique || signal<InstancesInterfaces.ObjectTypes[T] | null>(null);
  }

  
  addUniqueObject<T extends keyof InstancesInterfaces.ObjectTypes>(type: T, object: any): boolean {
    let respons: any;
    this.http.post<InstancesInterfaces.ObjectTypes[T][]>(`${this.apiUrl}/${type}`, object).subscribe(response => console.log(response));
    return(true);
  }

  /*this.objectListService.getObjects('drone', 'http://127.0.0.1:8000/api/drone').subscribe();
this.objectListService.getObjects('bike', 'http://127.0.0.1:8000/api/bike').subscribe();
const drones = this.objectListService.objectsMap.get('drone')!.all();
const uniqueDrone = this.objectListService.objectsMap.get('drone')!.unique();


*/
}
