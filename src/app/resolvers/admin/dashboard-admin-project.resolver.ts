import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {AdminProjectsService} from '../../services/admin/admin-projects.service';
import {Observable, tap} from 'rxjs';
import {Project} from '../../types/Project';

export const dashboardAdminProjectResolver: ResolveFn<Observable<Project[]>> = (route, state) => {
  const projectsService = inject(AdminProjectsService);

  return projectsService.fetchProjects().pipe(
    tap((projects) => {
      projectsService.projects.set(projects);
    })
  );
};
