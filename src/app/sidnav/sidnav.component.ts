import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidnav',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidnav.component.html',
  styleUrl: './sidnav.component.css'
})
export class SidnavComponent {

}
