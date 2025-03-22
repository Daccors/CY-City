import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidnav',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidnav.component.html',
  styleUrl: './sidnav.component.scss'
})
export class SidnavComponent {
  @Input() isMobile = false;
  @Output() AutoClose = new EventEmitter<boolean>;

  onButtonClicked(): void {
    if(this.isMobile){
      this.AutoClose.emit(true);
    }
  }
}
