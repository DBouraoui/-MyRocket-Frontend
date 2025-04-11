import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {AdminProjectsService, Project} from '../services/admin-projects.service';
import {Observable, tap} from 'rxjs';

export const dashboardAdminProjectResolver: ResolveFn<Observable<Project[]> > = (route, state) => {
  const projectsService = inject(AdminProjectsService);

  return projectsService.fetchProjects().pipe(
    tap((projects) => {
      projectsService.projects.set(projects);
    })
  );
};
