import { Injectable, signal, WritableSignal } from '@angular/core';
import { localisation, users, level, articles } from '../../shared/InstancesInterfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationsControlerService {
  private apiUrl = 'http://127.0.0.1:8000/api/allTables';
  private InformationsTypes = ['users', 'localisation', 'level', 'articles'] as const;
  private informationsMap = new Map<
    'users' | 'localisation' | 'level' | 'articles', {
      all: WritableSignal<users[] | localisation[] | level[] | articles[]>;
      unique: WritableSignal<users | localisation | level | articles | null>;
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

  registerObjectType<T extends 'users' | 'localisation' | 'level'| 'articles' >(type: T) {
    if (!this.informationsMap.has(type)) {
      this.informationsMap.set(type, {
        all: signal<(users[] | localisation[] | level[] | articles[])>([]),
        unique: signal<(users | localisation | level | articles | null)>(null)
      });
    }
  }

  getObjects<T extends 'users' | 'localisation' | 'level' |'articles'>(type: T): Observable<(users | localisation | level | articles)[]> {
    this.registerObjectType(type);
    return this.http.get<users[] | localisation[] | level[] | articles[]>(`${this.apiUrl}/${type}`).pipe(
      tap((data) => {
        this.informationsMap.get(type)!.all.set(data as users[] | localisation[] | level[] | articles[]);
      })
    );
  }


  getObjectById<T extends 'users' | 'localisation' | 'level' | 'articles'>(type: T, id: number): Observable<users|localisation|level|articles> {
    this.registerObjectType(type);

    return this.http.get<users|localisation|level|articles>(`${this.apiUrl}/${type}/${id}`).pipe(
      tap((data) => {
        this.informationsMap.get(type)!.unique.set(data);
      })
    );
  }

  getAllObjects<T extends 'users' | 'localisation' | 'level' | 'articles'>(type: T) {
    return this.informationsMap.get(type)?.all || signal<(users[] | localisation[] | level[] | articles[])>([]);
  }

  getUniqueObject<T extends 'users' | 'localisation' | 'level' | 'articles'>(type: T) {
    return this.informationsMap.get(type)?.unique || signal<(users | localisation | level | articles | null)>(null);
  }

  addObject<T extends 'users' | 'localisation' | 'level' | 'articles'>(type: T, object: users | localisation | level | articles): Observable<users | localisation | level | articles> {
    this.registerObjectType(type);

    return this.http.post<users | localisation | level | articles>(`${this.apiUrl}/${type}`, object).pipe(
      tap((data) => {
        const currentData = this.informationsMap.get(type)!.all();
        this.informationsMap.get(type)!.all.set([...currentData, data] as users[] | localisation[] | level[] | articles[]);
      })
    );
  }

  getFirstAvailableIndex<T extends 'users' | 'localisation' | 'level' | 'articles'>(type: T): number {
    this.registerObjectType(type);
    const currentData = this.informationsMap.get(type)!.all();
    return currentData.length+1;
  }
}
