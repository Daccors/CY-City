import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { DeviceDetectorService } from '../services/device-detector.service';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    MatCardModule,
    MatIcon,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  deviceType: String = '';

  constructor(private deviceDetectorService: DeviceDetectorService) {}

  ngOnInit(): void {
    // Récupérer le type d'appareil au moment du chargement du composant
    this.deviceType = this.deviceDetectorService.getDeviceType();
  }
}