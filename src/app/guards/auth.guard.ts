import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service'; // Asegúrate de tener este servicio
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(): boolean {
    // Aquí verificamos si hay un token en el LocalStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      return true; // Permite acceso
    } else {
      // Redirige al login si no hay token
      this.router.navigate(['/login']);
      return false; // Bloquea acceso
    }
  }
}
