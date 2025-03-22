import { Component, OnInit, viewChild, Output, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidnavComponent } from "./sidnav/sidnav.component";
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DeviceDetectorService } from './services/device-detector.service';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet, SidnavComponent, MatSidenavModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'CY City';
  mode : MatDrawerMode = "over";

  deviceType: string = '';
  isMobile: boolean = false;
  
  constructor(private deviceDetectorService: DeviceDetectorService) {}


  ngOnInit(): void {
    // Récupérer le type d'appareil au moment du chargement du composant
    this.deviceType = this.deviceDetectorService.getDeviceType();
    if (this.deviceType == 'mobile'){
      this.mode = "over";
      this.isMobile = true;
    } 
    else{
      this.mode = "side";
    }  
  }
}