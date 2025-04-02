import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidnav',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatTooltip
  ],
  templateUrl: './sidnav.component.html',
  styleUrl: './sidnav.component.scss'
})
export class SidnavComponent {
  @Input() isMobile = false;
  @Output() AutoClose = new EventEmitter<boolean>;


  userRole: String | null = null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserRoleObservable().subscribe(role => {
      this.userRole = role;
    });
  }

  logout() {
    this.authService.logout();
  }

  onButtonClicked(): void {
    if (this.isMobile) {
      this.AutoClose.emit(true);
    }
  }
}
