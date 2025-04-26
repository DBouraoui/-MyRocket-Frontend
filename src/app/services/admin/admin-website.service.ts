import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable, tap } from 'rxjs';
import { Website } from '../../types/Website';

@Injectable({
  providedIn: 'root'
})
export class AdminWebsiteService {
  website: WritableSignal<Website[]> = signal([])

  constructor(private http: HttpClient) { }

  fetchWebsite():Observable<Website[]> {
    return this.http.get<Website[]>(`${environment.SERVER_URL}/api/website/all`);
  }

  refreshWebsite():Observable<Website[]> {
    return this.fetchWebsite().pipe(
      tap(res=>{
        this.website.set(res);
      })
    )
  }

  createWebsite(payload : Object){
    return this.http.post(`${environment.SERVER_URL}/api/website`,payload);
  }

  createWebsiteContract(payload:Object) {
    return this.http.post(`${environment.SERVER_URL}/api/website/contract`, payload);
  }

  createWebsiteVps(payload : Object) {
    return this.http.post(`${environment.SERVER_URL}/api/website/vps`,payload);
  }

  createWebsiteMutualised(payload : Object){
    return this.http.post(`${environment.SERVER_URL}/api/website/mutualised`,payload);
  }

}
