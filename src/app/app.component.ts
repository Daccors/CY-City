import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CY City';
}