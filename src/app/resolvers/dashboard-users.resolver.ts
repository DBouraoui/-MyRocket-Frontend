import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {getUsersAdminResponse, User} from '../types/User';
import {Observable, tap} from 'rxjs';

export const dashboardUsersResolver: ResolveFn<Observable<User[]>> = (route, state) => {
const userService = inject(DashboardService);

  return userService.getUsers().pipe(
    tap((response) => {
      userService.users.set(response);
    })
  )
};
