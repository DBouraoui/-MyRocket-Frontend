import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarAdminComponent} from '../../admin/components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  imports: [
    RouterOutlet,
    SidebarAdminComponent
  ],
  templateUrl: './admin.component.html',
})
export class AdminComponent {

}
