import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { bike, drone, lamp, bin, publicScreen, } from '../InstancesInterfaces';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import objectData from '../../../../public/FakeTable.json';
import { objectInterface } from '../InstancesInterfaces';

function detectObjectType(object: any): string {
  if (!object || typeof object !== 'object') return 'unknown';
  if ('batterie' in object) return 'drone';
  if ('brand' in object) return 'bike';
  if ('type_of_content' in object) return 'publicScreen';
  if ('availability' in object && !('brand' in object)) return 'parking';
  if ('capacity' in object && 'opened' in object) return 'bin';
  if ('intensity' in object && 'presence' in object) return 'lamp';

  return 'unknown';
}

@Component({
  selector: 'app-object-card',
  imports: [
    MatCardModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DatePipe
  ],
  templateUrl: './object-card.component.html',
  styleUrl: './object-card.component.scss'
})
export class ObjectCardComponent {

  @Input() object: drone | bike | any;
  @Input() objectType: string = '';

  ObjectType: string = '';
  ObjectName: string = '';
  modifyUrl: string = '';
  icon: string = '';
  isLiked = false;
  blockFunc: boolean = true;
  relevantAttributes: string[] = [];
  displayNames: string[] = [];

  constructor(private authService: AuthService) { }

  toggleLike() {
    this.isLiked = !this.isLiked;
  }

  ngOnInit() {
    if (!this.object || !this.objectType) return;
    if(this.authService.getUserRole()!=null){
      this.blockFunc = false;
    }

    // Chercher la configuration correspondante dans le JSON
    const config: objectInterface | undefined = objectData.find(obj => obj.ObjectType === this.objectType);

    if (config) {
      this.relevantAttributes = config.relevantAtt;
      this.displayNames = config.display;
      this.icon = config.icon;
    }

    if (this.authService.getUserRole != null) {
      this.blockFunc = false;
    }

    if (this.object != null) {
      this.ObjectType = detectObjectType(this.object);
      this.modifyUrl = '/modification/' + this.ObjectType + '/' + this.object.id;

      if (this.ObjectType == 'drone') {
        this.ObjectName = "Drone";
        this.icon = 'local_shipping';
      } else if (this.ObjectType == 'bike') {
        this.ObjectName = "Vélo";
        this.icon = 'pedal_bike';
      } else if (this.ObjectType == 'publicScreen') {
        this.ObjectName = "Affichage Publique";
        this.icon = 'tv';
      } else if (this.ObjectType == 'parking') {
        this.ObjectName = "Place de parking";
        this.icon = 'local_parking';
      } else if (this.ObjectType == 'bin') {
        this.ObjectName = "Poubelle";
        this.icon = 'delete';
      } else if (this.ObjectType == 'lamp') {
        this.ObjectName = "Lampadaire";
        this.icon = 'lightbulb';
      } else {
        this.ObjectName = "Unknown";
        this.icon = 'help';
      }
    }
  }
}