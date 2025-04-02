import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DeviceDetectorService } from '../../services/device-detector.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatDivider } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl } from '@angular/forms';
import { ComponentResourceCollector } from '@angular/cdk/schematics';

@Component({
  selector: 'app-search-bar',
  standalone : true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTooltip,
    MatSliderModule,
    MatDivider,
    MatCheckboxModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  deviceType: String = '';
  open: boolean = false;
  distance = new FormControl(0);


  constructor(private deviceDetectorService: DeviceDetectorService) {
    this.distance.valueChanges.subscribe();
  }

  ngOnInit(): void {
    // Récupérer le type d'appareil au moment du chargement du composant
    this.deviceType = this.deviceDetectorService.getDeviceType();
  }

  @Output() searchChange = new EventEmitter<string>();

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchChange.emit(inputValue);
  }
}
