import { Component, inject, WritableSignal, } from '@angular/core';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { ObjectListService } from '../services/laravel-api/object-list.service';
import { ObjectCardComponent } from '../shared/object-card/object-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import objectData from '../../../public/FakeTable.json';
import { level, ObjectTypes, user } from '../shared/InstancesInterfaces';
import { UpperCasePipe } from '@angular/common';
import { InformationsControlerService } from '../services/laravel-api/informations-controler.service';
import { UserCardComponent } from '../shared/user-card/user-card.component';
import { Observable } from 'rxjs';

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
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private ObjectsList = inject(ObjectListService);
  allObjects: Record<string, WritableSignal<any[]>> = {};
  objectTypes: string[] = [];

  private InformationsList = inject(InformationsControlerService);
  allUsers: WritableSignal<user[]>;
  allLevels: WritableSignal<level[]>;

  ngOnInit() {
    objectData.forEach(obj => {
      const type = obj.ObjectType;
      this.allObjects[type] = this.ObjectsList.getAllObjects(type as keyof ObjectTypes); // Initialise le signal vide
      this.ObjectsList.getObjects(type as keyof ObjectTypes).subscribe((data) => {
        this.allObjects[type].set(data); // Remplit le signal avec les données reçues
      });

      this.allUsers = this.InformationsList.getAllObjects('user') as WritableSignal<user[]>;
      this.InformationsList.getObjects('user').subscribe((data) => {
        this.allUsers.set(data as user[]);
      });

      this.allLevels = this.InformationsList.getAllObjects('level') as WritableSignal<level[]>;
      this.InformationsList.getObjects('level').subscribe((data) => {
        this.allLevels.set(data as level[]);
      });

    });

    this.objectTypes = Object.keys(this.allObjects);
  }

  selectedChipValue: number | null = null;

  onChipSelectionChange(event: MatChipListboxChange) {
    this.selectedChipValue = event.value; // Récupère la valeur sélectionnée
  }
}
