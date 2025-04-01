import { Component, inject, Signal, WritableSignal, } from '@angular/core';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { ObjectListService } from '../services/laravel-api/object-list.service';
import { ObjectCardComponent } from '../shared/object-card/object-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import objectData from '../../../public/FakeTable.json';
import { ObjectTypes } from '../shared/InstancesInterfaces';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [
    SearchBarComponent,
    MatCardModule,
    MatDivider,
    MatChipsModule,
    ObjectCardComponent,
    MatExpansionModule,
    UpperCasePipe
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private ObjectsList = inject(ObjectListService);
  allObjects: Record<string, WritableSignal<any[]>> = {};
  objectTypes: string[]= [];

  ngOnInit() {
    objectData.forEach(obj => {
      const type = obj.ObjectType;
      const url = `http://127.0.0.1:8000/api/${type}`; // URL dynamique basée sur le type
      this.allObjects[type] = this.ObjectsList.getAllObjects(type as keyof ObjectTypes); // Initialise le signal vide
      this.ObjectsList.getObjects(type as keyof ObjectTypes).subscribe((data) => {
        this.allObjects[type].set(data); // Remplit le signal avec les données reçues
      });
    });

    this.objectTypes = Object.keys(this.allObjects);
  }
}
