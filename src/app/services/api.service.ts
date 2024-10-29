import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment; // URL del backend Flask

  constructor(private http: HttpClient, private router: Router) {}

  // Método para el login
  login(usuario: string, password: string): Observable<any> {
<<<<<<< HEAD
    return this.http.post(`${this.baseUrl}/login`, { usuario, password });
=======
    return this.http.post(`${environment.apiUrl}/login`, { usuario, password });
>>>>>>> ad3c91a (Cambiando El Front)
  }

  // Método para obtener sugerencias (con token)
  getSugerencias(columna: string, q: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
<<<<<<< HEAD
    return this.http.get(`${this.baseUrl}/sugerencias`, { headers, params: { columna, q } });
=======
    return this.http.get(`${environment.apiUrl}/sugerencias`, { headers, params: { columna, q } });
>>>>>>> ad3c91a (Cambiando El Front)
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token
    this.router.navigate(['/login']); // Redirige al login
  };

  // Método para realizar la búsqueda (con token)
  buscar(columna: string, valor_busqueda: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
<<<<<<< HEAD
    return this.http.post(`${this.baseUrl}/buscar`, { columna, valor_busqueda }, { headers });
=======
    return this.http.post(`${environment.apiUrl}/buscar`, { columna, valor_busqueda }, { headers });
>>>>>>> ad3c91a (Cambiando El Front)
  }
  
}
