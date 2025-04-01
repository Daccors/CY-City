import { Injectable, signal, WritableSignal } from '@angular/core';
import { localisation, user, level } from '../../shared/InstancesInterfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationsControlerService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private InformationsTypes = ['user', 'localisation', 'level'] as const;
  private informationsMap = new Map<
    'user' | 'localisation' | 'level', {
      all: WritableSignal<user[] | localisation[] | level[]>;
      unique: WritableSignal<user | localisation | level | null>;
    }>();

  constructor(private http: HttpClient) {
    this.initInformationTypes();
  }

  private initInformationTypes() {
    this.InformationsTypes.forEach(type => {
      this.informationsMap.set(type, {
        all: signal<any[]>([]),
        unique: signal<any | null>(null)
      });
    });
  }

  registerObjectType<T extends 'user' | 'localisation' | 'level'>(type: T) {
    if (!this.informationsMap.has(type)) {
      this.informationsMap.set(type, {
        all: signal<(user[] | localisation[] | level[])>([]),
        unique: signal<(user | localisation | level | null)>(null)
      });
    }
  }

  getObjects<T extends 'user' | 'localisation' | 'level'>(type: T): Observable<(user | localisation | level)[]> {
    this.registerObjectType(type);
    return this.http.get<user[] | localisation[] | level[]>(`${this.apiUrl}/${type}`).pipe(
      tap((data) => {
        this.informationsMap.get(type)!.all.set(data as user[] | localisation[] | level[]);
      })
    );
  }


  getObjectById<T extends 'user' | 'localisation' | 'level'>(type: T, id: number): Observable<user|localisation|level> {
    this.registerObjectType(type);

    return this.http.get<user|localisation|level>(`${this.apiUrl}/${type}/${id}`).pipe(
      tap((data) => {
        this.informationsMap.get(type)!.unique.set(data);
      })
    );
  }

  getAllObjects<T extends 'user' | 'localisation' | 'level'>(type: T) {
    return this.informationsMap.get(type)?.all || signal<(user[] | localisation[] | level[])>([]);
  }

  getUniqueObject<T extends 'user' | 'localisation' | 'level'>(type: T) {
    return this.informationsMap.get(type)?.unique || signal<(user | localisation | level | null)>(null);
  }

  addObject<T extends 'user' | 'localisation' | 'level'>(type: T, object: user | localisation | level): Observable<user | localisation | level> {
    this.registerObjectType(type);

    return this.http.post<user | localisation | level>(`${this.apiUrl}/${type}`, object).pipe(
      tap((data) => {
        const currentData = this.informationsMap.get(type)!.all();
        this.informationsMap.get(type)!.all.set([...currentData, data] as user[] | localisation[] | level[]);
      })
    );
  }

  getFirstAvailableIndex<T extends 'user' | 'localisation' | 'level'>(type: T): number {
    this.registerObjectType(type);
    const currentData = this.informationsMap.get(type)!.all();
    return currentData.length+1;
  }
}
