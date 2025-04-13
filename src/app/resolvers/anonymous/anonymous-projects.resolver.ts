import { ResolveFn } from '@angular/router';
import {Observable, tap} from 'rxjs';
import {Project} from '../../types/Project';
import {inject} from '@angular/core';
import {AnonymousProjectsService} from '../../services/anonymous/anonymous-projects.service';

export const anonymousProjectsResolver:  ResolveFn<Observable<Project[]> > = (route, state) => {
  const projectsService = inject(AnonymousProjectsService);

  return projectsService.fetchProjects().pipe(
    tap((projects) => {
      projectsService.projects.set(projects);
    })
  );
};
