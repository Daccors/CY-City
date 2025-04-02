import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, tap } from 'rxjs';
import * as InstancesInterfaces from '../../shared/InstancesInterfaces';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  public objTypes: (keyof InstancesInterfaces.ObjectTypes)[] = ['drone', 'bike', 'screen', 'bin', 'lamp', 'parking'];
  private apiUrl = 'http://127.0.0.1:8000/api/allTables/objects';
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

  getObjects<T extends keyof InstancesInterfaces.ObjectTypes>(type: T): Observable<InstancesInterfaces.ObjectTypes[T][]> {
    this.registerObjectType(type);

    return this.http.get<InstancesInterfaces.ObjectTypes[T][]>(`${this.apiUrl}/${type}`).pipe(
      tap((data) => {
        this.objectsMap.get(type)!.all.set(data);
      })
    );
  }

  getObjectById<T extends keyof InstancesInterfaces.ObjectTypes>(type: T, id: number): Observable<InstancesInterfaces.ObjectTypes[T]> {
    this.registerObjectType(type);
    return this.http.get<InstancesInterfaces.ObjectTypes[T]>(`${this.apiUrl}/${type}/${id}`).pipe(
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

  addObject<T extends keyof InstancesInterfaces.ObjectTypes>(type: T, object: InstancesInterfaces.ObjectTypes[T]): Observable<InstancesInterfaces.ObjectTypes[T]> {
    this.registerObjectType(type);

    return this.http.post<InstancesInterfaces.ObjectTypes[T]>(`${this.apiUrl}/${type}`, object).pipe(
      tap((data) => {
        const currentData = this.objectsMap.get(type)!.all();
      this.objectsMap.get(type)!.all.set([...currentData, data] as InstancesInterfaces.ObjectTypes[T][]);
      })
    );
  }

  async getFirstAvailableIndex<T extends keyof InstancesInterfaces.ObjectTypes>(type: T): Promise<number> {
    this.registerObjectType(type); // Enregistre l'objet
    const objects = this.objectsMap.get(type)?.all() ?? [];

    return objects.length + 1;
  }

  modifyObject<T extends keyof InstancesInterfaces.ObjectTypes>(object: InstancesInterfaces.ObjectTypes[T], type: T,  id: number) {
    console.log(object);
    return this.http.put(`${this.apiUrl}/${type}/${id}`, JSON.stringify(object)).subscribe((response) => {
      console.log(response);
    });
  }
}
