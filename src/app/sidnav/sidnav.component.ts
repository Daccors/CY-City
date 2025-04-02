import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatTooltip } from '@angular/material/tooltip';
import { isThisTypeNode } from 'typescript';

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
  
  private authService = inject(AuthService);
  profilepage: string = '/profile_page/';
  userRole: String | null = null;

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
