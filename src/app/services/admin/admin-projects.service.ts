import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Project } from '../../types/Project';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AdminProjectsService {
  projects: WritableSignal<Project[]> = signal([]);

  constructor(private http: HttpClient) {}

  fetchProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.SERVER_URL}/api/user/project`, {
      params: {
        all: true,
      },
    });
  }

  refreshProjects(): Observable<Project[]> {
    return this.fetchProjects().pipe(
      tap(response => {
        this.projects.set(response);
      })
    );
  }

  createProjects(payload: Object): Observable<Object> {
   return this.http.post<any>(`${environment.SERVER_URL}/api/administrateur/projects-display`, payload);
  }
}
