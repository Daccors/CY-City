import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-search',
  imports: [
    SearchBarComponent,
    MatCardModule,
    MatDivider,
    MatChipsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

}
