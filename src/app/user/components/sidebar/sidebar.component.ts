import { Component } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarItems } from '../../../types/Navbar';
import { AuthService } from '../../../services/user/auth.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-user-sidebar',
  imports: [Button, Drawer, RouterLinkActive, RouterLink, ButtonDirective, NotificationComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  constructor(private router : Router, public authService : AuthService) {
  }

  visible: boolean = false;
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
      link: '/utilisateur/paiments',
      icon: 'pi-credit-card',
    },
    // {
    //   title: 'Support',
    //   link: '/utilisateur/contact',
    //   icon: 'pi-comments',
    // },
    // {
    //   title: 'Demandes',
    //   link: '/utilisateur/contact',
    //   icon: 'pi-ticket',
    // },
  ];

  deconnexion():void {
    localStorage.removeItem('statement');
    this.router.navigateByUrl('/home');
  }
}
