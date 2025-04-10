import {Component, Input} from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {User} from '../../../../../types/User';
import {FormsModule} from '@angular/forms';
import {Tag} from 'primeng/tag';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard-admin-users-search',
  imports: [
    Button,
    InputText,
    FormsModule,
    Tag,
    CommonModule
  ],
  templateUrl: './dashboard-admin-users-search.component.html',
})
export class DashboardAdminUsersSearchComponent  {
  @Input() users: User[] = [];
  searchInput = "";
  filteredUsers: User[] = [];

  filterUsers() {
    if (this.searchInput != "") {
      this.filteredUsers = this.users.filter(user =>
        user.email.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        (user.firstname?.toLowerCase().includes(this.searchInput.toLowerCase())) ||
        (user.lastname?.toLowerCase().includes(this.searchInput.toLowerCase()))
      );
    } else if (this.searchInput == "") {
      this.filteredUsers = [];
    }
  }

}
