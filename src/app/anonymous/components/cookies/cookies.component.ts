import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { PrimeTemplate } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookies',
  imports: [Button, Dialog, CommonModule],
  templateUrl: './cookies.component.html',
})
export class CookiesComponent {
  showBanner: boolean = true;
  showInfo: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieChoice = localStorage.getItem('cookieChoice');
    if (cookieChoice) {
      this.showBanner = false;
    }
  }

  /**
   * Ouvre la fenêtre d'information sur les cookies
   */
  openCookieInfo(event: Event): void {
    event.preventDefault();
    this.showInfo = true;
  }

  /**
   * Accepte les cookies et ferme la bannière
   */
  acceptCookies(): void {
    localStorage.setItem('cookieChoice', 'accepted');
    this.showBanner = false;
    this.showInfo = false;
  }

  /**
   * Refuse les cookies et ferme la bannière
   */
  rejectCookies(): void {
    localStorage.setItem('cookieChoice', 'rejected');
    this.showBanner = false;
    this.showInfo = false;

    // Si l'utilisateur refuse, on peut éventuellement supprimer les tokens JWT
    // existants dans le localStorage pour respecter son choix
    localStorage.removeItem('jwtToken');
  }
}
