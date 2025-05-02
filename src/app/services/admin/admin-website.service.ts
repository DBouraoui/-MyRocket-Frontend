import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable, tap } from 'rxjs';
import { Website } from '../../types/Website';

@Injectable({
  providedIn: 'root',
})
export class AdminWebsiteService {
  website: WritableSignal<Website[]> = signal([]);
  allInformations: WritableSignal<Website[]> = signal([]);

  constructor(private http: HttpClient) {}

  fetchWebsite(): Observable<Website[]> {
    return this.http.get<Website[]>(`${environment.SERVER_URL}/api/administrateur/website`);
  }

  refreshWebsite(): Observable<Website[]> {
    return this.fetchWebsite().pipe(
      tap(res => {
        this.website.set(res);
      })
    );
  }

  fetchAllInformation(): Observable<Website[]> {
    return this.http.get<Website[]>(
      `${environment.SERVER_URL}/api/administrateur/website/all-informations`
    );
  }

  refreshAllInformation(): Observable<Website[]> {
    return this.fetchAllInformation().pipe(
      tap(res => {
        this.allInformations.set(res);
      })
    );
  }

  createWebsite(payload: object) {
    return this.http.post(`${environment.SERVER_URL}/api/administrateur/website`, payload);
  }

  createWebsiteContract(payload: object) {
    return this.http.post(`${environment.SERVER_URL}/api/administrateur/website-contract`, payload);
  }

  createWebsiteVps(payload: object) {
    return this.http.post(`${environment.SERVER_URL}/api/administrateur/website-config/vps`, payload);
  }

  createWebsiteMutualised(payload: object) {
    return this.http.post(`${environment.SERVER_URL}/api/administrateur/website-config/mutualised`, payload);
  }

  createMaintenanceContract(payload: object) {
    return this.http.post(
      `${environment.SERVER_URL}/api/administrateur/maintenance-contract`,
      payload
    );
  }

  deleteWebsite(uuid: string):Observable<string> {
    return this.http.delete<string>(`${environment.SERVER_URL}/api/administrateur/website/${uuid}`);
  }
}
