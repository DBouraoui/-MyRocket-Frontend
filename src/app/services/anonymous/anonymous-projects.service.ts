import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Project } from '../../types/Project';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AnonymousProjectsService {
  projects: WritableSignal<Project[]> = signal([]);

  constructor(private http: HttpClient) {}

  fetchProjects(): Observable<Project[]> {
    localStorage.removeItem('statement');
    return this.http.get<Project[]>(`${environment.SERVER_URL}/api/user/project`, {
      params: {
        all: true,
      },
    });
  }
}
