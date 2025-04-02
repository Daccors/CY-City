import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {

  constructor() { }

  isMobile(): boolean {
    // Vérification de l'User-Agent pour détecter un appareil mobile
    const userAgent = navigator.userAgent.toLowerCase();
    return /iphone|ipod|ipad|android/.test(userAgent);
  }

  isTablet(): boolean {
    // Tu peux ajuster les conditions pour vérifier si c'est une tablette
    const userAgent = navigator.userAgent.toLowerCase();
    return /ipad|android.*tablet/.test(userAgent);
  }

  isDesktop(): boolean {
    return !this.isMobile() && !this.isTablet();
  }

  getDeviceType(): string {
    if (this.isMobile()) {
      return 'mobile';
    } else if (this.isTablet()) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }
}
