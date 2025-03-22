import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DeviceDetectorService } from '../../services/device-detector.service';

@Component({
  selector: 'app-search-bar',
  standalone : true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  deviceType: String = '';

  constructor(private deviceDetectorService: DeviceDetectorService) {}

  ngOnInit(): void {
    // Récupérer le type d'appareil au moment du chargement du composant
    this.deviceType = this.deviceDetectorService.getDeviceType();
  }
}
