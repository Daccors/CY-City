import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { user, } from '../InstancesInterfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { level } from '../InstancesInterfaces';

@Component({
  selector: 'app-user-card',
  imports: [
    MatCardModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() user: user;
  @Input() level: level

  profilePage: string = '';
  profilePic: string = '';

  constructor() { }

  ngOnInit() {
    if(this.user.photo == null){
      this.profilePic = '../../../../public/placeholder.png';
    }
  }

  // Chercher la configuration correspondante dans le JSON

}
