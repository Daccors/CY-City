import { Component, inject, Injector } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { ObjectListService } from '../services/laravel-api/object-list.service';
import { ObjectCardComponent } from '../shared/object-card/object-card.component';
import { AddObjectComponent } from "../add-object/add-object.component";

@Component({
  selector: 'app-search',
  imports: [
    SearchBarComponent,
    MatCardModule,
    MatDivider,
    MatChipsModule,
    ObjectCardComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private ObjectsList = inject(ObjectListService);

  drones = this.ObjectsList.drones; // Assuming this is a WritableSignal<drone[]>
  UniqueDrone = this.ObjectsList.uniqueDrone;

  bikes = this.ObjectsList.bikes;

  ngOnInit() {
    this.ObjectsList.getDrones().subscribe((drone) => { this.drones.set(drone); });
    this.ObjectsList.getDroneById(10).subscribe((drone) => {this.UniqueDrone.set(drone);});
    this.ObjectsList.getBikes().subscribe((bikes) => { this.bikes.set(bikes); });
  }
}
