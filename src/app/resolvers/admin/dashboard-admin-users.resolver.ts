import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {AdminUsersService} from '../../services/admin/admin-users.service';
import {User} from '../../types/User';
import {Observable, tap} from 'rxjs';

export const dashboardAdminUsersResolver: ResolveFn<Observable<User[]>> = (route, state) => {
const userService = inject(AdminUsersService);

  return userService.getUsers().pipe(
    tap((response) => {
      userService.users.set(response);
    })
  )
};
