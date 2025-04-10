import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getUsersAdminResponse, Token} from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<getUsersAdminResponse> {
    return this.http.get<getUsersAdminResponse>('http://localhost:8000/api/user', {
      params: {
        all: true
      }
    });
  }

}
