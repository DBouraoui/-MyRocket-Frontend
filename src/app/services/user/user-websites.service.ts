import { Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contracts, MaintenanceContract, Website} from '../../types/Website';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserWebsitesService {
  website: WritableSignal<Website[]> = signal([]);
  contract: WritableSignal<Contracts[]>  = signal([]);
  maintenanceContract :WritableSignal<MaintenanceContract[]> = signal([]);

  constructor(private http:HttpClient) { }

  fetchWebsites(): Observable<Website[]> {
    return this.http.get<Website[]>(`${environment.SERVER_URL}/api/website`, {
      params: {
        all: true
      }
    })
  }

  fetchWebsitesContract():Observable<Contracts[]> {
    return this.http.get<Contracts[]>(`${environment.SERVER_URL}/api/website/contract/me`);
  }

  fetchWebsitesMaintenanceContract():Observable<MaintenanceContract[]> {
    return this.http.get<MaintenanceContract[]>(`${environment.SERVER_URL}/api/maintenance/contract/me`);
  }

  refreshWebsites():Observable<Website[]> {
    return this.fetchWebsites().pipe(
      tap(websites => {
        this.website.set(websites);
      })
    )
  }

  refreshContract():Observable<Contracts[]> {
    return this.fetchWebsitesContract().pipe(
      tap(contract => {
        this.contract.set(contract);
      })
    )
  }
  refreshMaintenanceContract():Observable<MaintenanceContract[]> {
    return this.fetchWebsitesMaintenanceContract().pipe(
      tap(contract => {
        this.maintenanceContract.set(contract);
      })
    )
  }


}
