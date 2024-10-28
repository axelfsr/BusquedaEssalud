import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  imports:[CommonModule,FormsModule],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  standalone: true
})
export class BusquedaComponent {
  columnaSeleccionada: string = 'NROPLAZA';
  valorBusqueda: string = '';
  sugerencias: string[] = [];
  resultados: any[] = [];
  mostrarModal: boolean = false;
  detalles: any = {};
  detallesKeys: string[] = [];

  constructor(private apiService: ApiService) {}

  // Buscar sugerencias al escribir en el cuadro de búsqueda
  buscarSugerencias() {
    if (this.valorBusqueda.length > 0) {
      this.apiService.getSugerencias(this.columnaSeleccionada, this.valorBusqueda).subscribe(data => {
        this.sugerencias = data;
      });
    } else {
      this.sugerencias = [];
    }
  }

  // Ocultar sugerencias y limpiar resultados al seleccionar una sugerencia
  seleccionarSugerencia(sugerencia: string) {
    this.valorBusqueda = sugerencia;
    this.sugerencias = [];
  }

  // Método para buscar y ocultar sugerencias al hacer clic en "Buscar"
  buscar() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.buscar(this.columnaSeleccionada, this.valorBusqueda, token).subscribe(data => {
        this.resultados = data;
      });
    }
    this.sugerencias = []; // Oculta las sugerencias
  }

  // Limpiar cuadro de búsqueda y sugerencias
  limpiar() {
    this.valorBusqueda = '';
    this.sugerencias = [];
    this.resultados = [];
  }

  // Método para mostrar detalles en un modal al hacer clic en un resultado
  mostrarDetalles(resultado: any) {
    this.detalles = resultado;
    this.detallesKeys = Object.keys(resultado);
    this.mostrarModal = true;
  }

  // Cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
  }

  // Limpia el cuadro de búsqueda cuando cambia el tipo de búsqueda
  onColumnaChange() {
    this.limpiar();
  }

  logout() {
    this.apiService.logout(); // Llama al método de logout del servicio
  }

  // Detectar clic fuera del cuadro de búsqueda para ocultar sugerencias, ignorando el modal
  @HostListener('document:click', ['$event'])
  clickFuera(event: Event) {
    const target = event.target as HTMLElement;
    const isInputOrSuggestion = target.classList.contains('input') || target.closest('#sugerencias');
    const isModalContent = target.closest('.modal-content');  // Verifica si se hizo clic dentro del modal

    if (!isInputOrSuggestion && !isModalContent) {
      this.sugerencias = [];
    }
  }
}