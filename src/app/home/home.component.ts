import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from '../services/device-detector.service';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
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