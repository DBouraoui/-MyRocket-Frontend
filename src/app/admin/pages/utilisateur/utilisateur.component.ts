import {Component, OnDestroy, OnInit} from '@angular/core';
import {IftaLabel} from 'primeng/iftalabel';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';
import {Chip} from 'primeng/chip';
import {User} from '../../../types/User';
import {ActivatedRoute} from '@angular/router';
import {CreateUserFormComponent} from './components/create-user-form/create-user-form.component';
import {
  DashboardAdminUsersMetricsComponent
} from './components/dashboard-admin-users-metrics/dashboard-admin-users-metrics.component';
import {
  DashboardAdminUsersSearchComponent
} from './components/dashboard-admin-users-search/dashboard-admin-users-search.component';

@Component({
  selector: 'app-utilisateur',
  imports: [
    InputText,
    Button,
    ReactiveFormsModule,
    Chip,
    CreateUserFormComponent,
    DashboardAdminUsersMetricsComponent,
    DashboardAdminUsersSearchComponent,
  ],
  templateUrl: './utilisateur.component.html',
})
export class UtilisateurComponent implements OnInit{
  users: User[] = [];


  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.users = data['users'];
    })
  }
}
