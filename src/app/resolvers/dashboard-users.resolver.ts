import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {getUsersAdminResponse} from '../types/User';
import {Observable} from 'rxjs';

export const dashboardUsersResolver: ResolveFn<Observable<getUsersAdminResponse>> = (route, state) => {
const userService = inject(DashboardService);
  return userService.getUsers();
};
