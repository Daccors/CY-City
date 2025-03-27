import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SidnavComponent } from "./sidnav/sidnav.component";
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DeviceDetectorService } from './services/device-detector.service';
import { AuthService } from './services/auth.service';
import {Title} from "@angular/platform-browser";
import { ObjectListService } from './services/laravel-api/object-list.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidnavComponent, MatSidenavModule, MatIconModule, MatButtonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'CY City';
  pageTitle = "";

  mode: MatDrawerMode = "over";
  deviceType: string = '';
  isMobile: boolean = false;
  message: any = "";

  constructor(private deviceDetectorService: DeviceDetectorService, private authService: AuthService, public router: Router, private ObjectService : ObjectListService) {
    window.document.addEventListener("click", () =>{
      this.pageTitle = window.document.title;
    })
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
    this.ObjectService.getObjects().subscribe(response => {
      this.message = response;
    });

    console.log(this.message);
  }

  onUserChange() {
    this.userRole = this.authService.getUserRole();
  }
}