import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordVisible: boolean = false;
  rememberMe: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {
    // Cargar usuario recordado, si existe
    const savedUser = localStorage.getItem('savedUser');
    if (savedUser) {
      this.usuario = savedUser;
      this.rememberMe = true;
    }
  }

  onLogin() {
    if (this.rememberMe) {
      localStorage.setItem('savedUser', this.usuario); // Guarda el usuario si se selecciona "Recordarme"
    } else {
      localStorage.removeItem('savedUser'); // Elimina el usuario si no se selecciona "Recordarme"
    }

    this.apiService.login(this.usuario, this.password).subscribe(
      response => {
        if (response.isSuccess) {
          localStorage.setItem('token', response.token); // Guarda el token
          this.router.navigate(['/busqueda']);           // Redirige a la página de búsqueda
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      },
      error => {
        this.errorMessage = 'Error en el inicio de sesión';
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
