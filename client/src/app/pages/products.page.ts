import { Component, inject, signal } from '@angular/core';
import {
  Actions,
  FormularioComponent,
} from '../components/formulario.component';
import { ProductsService } from '../services/products.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormularioComponent, RouterLink],
  template: `
    <div class="flex">
      <header class="min-h-screen w-96 flex  justify-center bg-[#23232a] p-6">
        <div class="flex flex-col items-center">
          <img class="h-8 mb-10" src="logo.png" alt="" />
          <svg
          class="mb-4"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ffffff"
              d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5Zm0 3.9a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0 7.9c2 0 6 1.09 6 3.08a7.2 7.2 0 0 1-12 0c0-1.99 4-3.08 6-3.08"
            />
          </svg>

          <span class="text-white">Jesenia Isabel</span>
          <small class="text-white">jesenia.pazto#64agmail.com</small>

          <ul class="text-white">
            <li>
              Productos
            </li>
            <li>
              Perfil
            </li>
            <li>
              Salir
            </li>
          </ul>

        </div>
      </header>
      <main class="bg-[#1E1D24] text-white w-full  p-8">
        <h1 class="text-3xl font-bold mb-8">Inventario de Productos</h1>

        <!-- Barra de búsqueda -->
        <div class="flex justify-between mb-8 gap-4 flex-wrap">
          <div class="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <g fill="none" fill-rule="evenodd">
                <path
                  d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                />
                <path
                  fill="currentColor"
                  d="M5 10a5 5 0 1 1 10 0a5 5 0 0 1-10 0m5-7a7 7 0 1 0 4.192 12.606l5.1 5.101a1 1 0 0 0 1.415-1.414l-5.1-5.1A7 7 0 0 0 10 3"
                />
              </g>
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre o código"
              class="w-full pl-12 pr-4 py-3 rounded-lg bg-[#2A2933] text-white focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
            />
          </div>
          <button
            class="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-lg font-semibold"
            (click)="mostrarFormulario()"
          >
            Registrar Producto
          </button>
        </div>

        <!-- Lista de productos -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          @for(producto of serviceProductos.productos(); track $index) {

          <div
            [routerLink]="['/detalle-producto']"
            class=" bg-[#2a2933] rounded-xl p-4 hover:ring-2 hover:ring-violet-500 transition relative"
          >
            <img
              [src]="producto.imagen"
              alt="Producto"
              class="rounded-lg mb-4 h-60 w-full object-cover"
            />
            <div class="text-gray-300 text-sm mb-1">
              Categoría: {{ producto.categoria }}
            </div>
            <h2 class="text-2xl font-bold">{{ producto.nombre }}</h2>
            <p class="text-sm text-gray-400">Código: {{ producto.codigo }}</p>
            <p class="text-sm text-gray-400 mb-4">
              Unidad: {{ producto.unidad }}
            </p>

            <!-- Botones en la esquina inferior derecha -->
            <div class="absolute bottom-4 right-4 flex gap-2">
              <button
                class="h-10 cursor-pointer rounded-lg bg-violet-600 hover:bg-violet-700 px-3 text-white  transition-colors"
                title="Editar producto"
                (click)="$event.stopPropagation()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-5"
                >
                  <path
                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712m-2.218 5.93-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32z"
                  />
                  <path
                    d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5z"
                  />
                </svg>
              </button>
              <button
                class="h-10 cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 px-2 text-white  transition-colors"
                title="Eliminar producto"
                (click)="$event.stopPropagation()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffffff"
                    d="M9.808 17h1V8h-1zm3.384 0h1V8h-1zM6 20V6H5V5h4v-.77h6V5h4v1h-1v14z"
                  />
                </svg>
              </button>
            </div>
          </div>
          }
        </div>

        <app-formulario
          [(mostrarModal)]="mostrarModal"
          [acciones]="accionAsignada()"
        ></app-formulario>
      </main>
    </div>
  `,
})
export class ProductsPage {
  public serviceProductos = inject(ProductsService);
  public accionAsignada = signal<Actions>('Registrar');
  public mostrarModal = signal<boolean>(false);

  constructor() {
    console.log(this.serviceProductos.productos);
  }

  mostrarFormulario() {
    this.mostrarModal.set(true);
    this.accionAsignada.set('Registrar');
  }
  visualizarFormulario() {
    this.mostrarModal.set(true);
    this.accionAsignada.set('Visualizar');
  }
}
