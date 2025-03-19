import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidnavComponent } from "./sidnav/sidnav.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet, SidnavComponent, MatSidenavModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CY City';
  showFiller = false;
}