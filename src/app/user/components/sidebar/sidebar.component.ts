import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {Drawer} from "primeng/drawer";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NavbarItems} from '../../../types/Navbar';

@Component({
  selector: 'app-user-sidebar',
  imports: [
    Button,
    Drawer,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  visible : boolean = false
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
  ];
}
