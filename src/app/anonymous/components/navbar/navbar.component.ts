import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarItems } from '../../../types/Navbar';
import {Button} from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, Button, OverlayPanelModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  mobileMenuOpen: boolean = false;
  navbarItem: NavbarItems[] = [
    {
      title: 'Accueil',
      link: '/',
      icon: 'pi-home',
    },
    {
      title: 'Contact',
      link: '/contact',
      icon: 'pi-envelope',
    },
    {
      title: 'Prestation',
      link: '/prestation',
      icon: 'pi-briefcase',
      subContent: [
        {
          title: "Création d'application web",
          link: '/create',
          icon: 'pi-desktop',
          description:
            'Solutions digitales sur mesure pour les entreprises nécessitant des applications web complexes et personnalisées (intranet, e-commerce, etc.).',
        },
        {
          title: 'Création de site web',
          link: '/create',
          icon: 'pi-globe',
          description:
            'Sites web professionnels avec back-office intégré permettant aux entreprises de gérer et personnaliser leur contenu en toute autonomie.',
        },
        {
          title: 'Création de site web vitrine',
          link: '/create',
          icon: 'pi-window-maximize',
          description:
            'Sites web élégants et performants pour valoriser votre image de marque et votre activité, sans nécessiter de gestion de contenu complexe.',
        },
        {
          title: 'Factureo',
          link: '/create',
          icon: 'pi-file-pdf',
          description:
            'Service de facturation en ligne français conçu spécifiquement pour les auto-entrepreneurs, TPE et PME.',
        },
        {
          title: 'Signacore',
          link: '/create',
          icon: 'pi-check-square',
          description:
            'Solution de signature électronique sécurisée et conforme à la réglementation française.',
        },
      ],
    },
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    if (!this.mobileMenuOpen) {
      this.navbarItem.forEach((item) => {
        if (item.subContent) {
          item.isOpen = false;
        }
      });
    }
  }

  toggleSubmenu(item: NavbarItems): void {
    if (item.subContent) {
      item.isOpen = !item.isOpen;
    }
  }
}
