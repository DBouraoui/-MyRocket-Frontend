import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('statement');
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
      }
    }
    return null;
  }

  hasRole(role: string): boolean {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.roles) {
      return decodedToken.roles.includes(role);
    }
    return false;
  }

  isTokenExpired(): boolean {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      return Date.now() >= decodedToken.exp * 1000;
    }
    return true;  // Si pas de token ou pas d'exp, on considère qu'il est expiré
  }
}
