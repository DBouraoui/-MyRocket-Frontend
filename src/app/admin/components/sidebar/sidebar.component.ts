import { Component } from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { Button } from 'primeng/button';
import { NavbarItems } from '../../../types/Navbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  imports: [Drawer, Button, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarAdminComponent {
  visible: boolean = false;

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
  ];
}
