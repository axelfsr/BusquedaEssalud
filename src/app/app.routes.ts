import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'busqueda', 
    component: BusquedaComponent,
    canActivate: [AuthGuard] // Protege la ruta con el guardia
  },
  { path: '**', redirectTo: 'login' }
];
