import { Component } from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {Drawer} from "primeng/drawer";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NavbarItems} from '../../../types/Navbar';

@Component({
  selector: 'app-user-sidebar',
  imports: [
    Button,
    Drawer,
    RouterLinkActive,
    RouterLink,
    ButtonDirective
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  visible : boolean = false
  navbarItem: NavbarItems[] = [
    {
      title: 'Mon tableau de bord',
      link: '/utilisateur/dashboard',
      icon: 'pi-home',
    },
    {
      title: 'Mes sites web',
      link: '/utilisateur/website',
      icon: 'pi-globe',
    },
    {
      title: 'Mes paiements',
      link: '/utilisateur/projects',
      icon: 'pi-credit-card',
    },
    {
      title: 'Support',
      link: '/utilisateur/contact',
      icon: 'pi-comments',
    },
    {
      title: 'Demandes',
      link: '/utilisateur/contact',
      icon: 'pi-ticket',
    },
  ];
}
