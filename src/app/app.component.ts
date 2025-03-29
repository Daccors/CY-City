import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RoutesRecognized } from '@angular/router';
import { SidnavComponent } from "./sidnav/sidnav.component";
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DeviceDetectorService } from './services/device-detector.service';
import { AuthService } from './services/auth.service';
import { ObjectListService } from './services/laravel-api/object-list.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidnavComponent, MatSidenavModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'CY City';
  pageTitle = "";

  mode: MatDrawerMode = "over";
  deviceType: string = '';
  isMobile: boolean = false;
  currentPage: string = '';
  openDrawer: boolean = true;

  constructor(private deviceDetectorService: DeviceDetectorService, private authService: AuthService, public router: Router, private objectService: ObjectListService) {
  }
  userRole: String | null = null;
  ngOnInit(): void {
    // Récupérer le type d'appareil au moment du chargement du composan
    this.userRole = this.authService.getUserRole();

    this.deviceType = this.deviceDetectorService.getDeviceType();
    if (this.deviceType == 'mobile') {
      this.mode = "over";
      this.isMobile = true;
    }
    else {
      this.mode = "side";
    }

    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        this.currentPage = event['url'];
        if (this.currentPage == '/sign_in_up') {
          this.openDrawer = false;
        }
        else {
          this.openDrawer = true;
        }
      }
    });
  }
  onUserChange() {
    this.userRole = this.authService.getUserRole();
  }
}