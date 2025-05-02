import { Component, inject } from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { Button, ButtonDirective } from 'primeng/button';
import { NavbarItems } from '../../../types/Navbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  imports: [Drawer, Button, RouterLink, RouterLinkActive, ButtonDirective],
  templateUrl: './sidebar.component.html',
})
export class SidebarAdminComponent {
  visible: boolean = false;
  router = inject(Router);

  navbarItem: NavbarItems[] = [
    {
      title: 'Accueil',
      link: '/administration/dashboard',
      icon: 'pi-home',
    },
    {
      title: 'Utilisateurs',
      link: '/administration/utilisateurs',
      icon: 'pi-user',
    },
    {
      title: 'MAJ projects',
      link: '/administration/projects',
      icon: 'pi-envelope',
    },
    {
      title: 'Contact',
      link: '/administration/contact',
      icon: 'pi-envelope',
    },
    {
      title: 'Sites web',
      link: '/administration/website',
      icon: 'pi-globe',
    },
    {
      title: 'Transaction',
      link: '/administration/paiments',
      icon: 'pi-euro',
    },
  ];

  deconnexion() {
    localStorage.removeItem('statement');
    this.router.navigateByUrl('/login');
  }
}
