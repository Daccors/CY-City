import { Component, inject, WritableSignal, } from '@angular/core';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { ObjectListService } from '../services/laravel-api/object-list.service';
import { ObjectCardComponent } from '../shared/object-card/object-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import objectData from '../../../public/FakeTable.json';
import { articles, level, ObjectTypes, users } from '../shared/InstancesInterfaces';
import { UpperCasePipe } from '@angular/common';
import { InformationsControlerService } from '../services/laravel-api/informations-controler.service';
import { UserCardComponent } from '../shared/user-card/user-card.component';
import { ArticleCardComponent } from '../shared/article-card/article-card.component';
import { SearchService } from '../services/laravel-api/search.service';

@Component({
  selector: 'app-search',
  imports: [
    SearchBarComponent,
    MatCardModule,
    MatDivider,
    MatChipsModule,
    ObjectCardComponent,
    MatExpansionModule,
    UpperCasePipe,
    UserCardComponent,
    ArticleCardComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private ObjectsList = inject(ObjectListService);
  allObjects: Record<string, WritableSignal<any[]>> = {};
  objectTypes: string[] = [];

  private InformationsList = inject(InformationsControlerService);
  allUsers: WritableSignal<users[]>;
  allLevels: WritableSignal<level[]>;
  allArticles: WritableSignal<articles[]>;

  private SearchList = inject(SearchService);
  searchResults: Record<string, any[]>;
  keyCount: number;
  currentSearch: string;

  ngOnInit() {
    objectData.forEach(obj => {
      const type = obj.ObjectType;
      this.allObjects[type] = this.ObjectsList.getAllObjects(type as keyof ObjectTypes); // Initialise le signal vide
      this.ObjectsList.getObjects(type as keyof ObjectTypes).subscribe((data) => {
        this.allObjects[type].set(data); // Remplit le signal avec les données reçues
      });

      this.allUsers = this.InformationsList.getAllObjects('users') as WritableSignal<users[]>;
      this.InformationsList.getObjects('users').subscribe((data) => {
        this.allUsers.set(data as users[]);
      });

      this.allLevels = this.InformationsList.getAllObjects('level') as WritableSignal<level[]>;
      this.InformationsList.getObjects('level').subscribe((data) => {
        this.allLevels.set(data as level[]);
      });

      this.allArticles = this.InformationsList.getAllObjects('articles') as WritableSignal<articles[]>;
      this.InformationsList.getObjects('articles').subscribe((data) => {
        this.allArticles.set(data as articles[]);
      });

    });

    this.objectTypes = Object.keys(this.allObjects);
  }

  selectedChipValue: number | null = null;

  onChipSelectionChange(event: MatChipListboxChange) {
    this.selectedChipValue = event.value;
  }

  searchObjects: Record<string, WritableSignal<any[]>>;
  searchObjectsTypes: string[] = [];
  searchUsers: users[];
  searchArticles: articles[];

  onSearchChange(value: string) {
    this.currentSearch = value;
    this.SearchList.getObjects(value).subscribe({
      next: (data) => {
        this.searchResults = data;
        this.keyCount = Object.keys(this.searchResults).length;
        this.searchUsers = this.searchResults['users'] as users[];
        this.searchArticles = this.searchResults['articles'] as articles[];
        
        delete this.searchResults['users'];
        delete this.searchResults['articles'];

        Object.keys(this.searchResults).forEach(key => {
          const type = key as keyof ObjectTypes;
          this.searchObjects[type].set(this.searchResults[key]);
        });
        this.searchObjectsTypes = Object.keys(this.searchObjects);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des résultats :', error);
      }
    });
  }
}
