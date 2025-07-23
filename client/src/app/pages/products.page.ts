import { Component, signal } from '@angular/core';
import { FormularioComponent } from '../components/formulario.component';

@Component({
  imports: [FormularioComponent],
  template: `
    <header
      class="w-full flex justify-between items-center  bg-[#23232a] px-6 py-4 "
    >
      <h1 class="text-xl font-semibold text-[#f3edea] flex">
        <img class="h-8" src="logo.png" alt="" />
        | Panel de Inventario
      </h1>
      <button
        class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition text-white"
      >
        Cerrar sesión
      </button>
    </header>
    <main class="bg-[#1E1D24] text-white min-h-screen p-8">
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
        <!-- Tarjeta Producto -->
        <div
          class=" bg-[#2a2933] rounded-xl p-4 hover:ring-2 hover:ring-violet-500 transition relative"
        >
          <img src="laptops.jpg" alt="Producto" class="rounded-lg mb-4" />
          <div class="text-gray-300 text-sm mb-1">Categoría: Laptops</div>
          <h2 class="text-2xl font-bold">Laptop Gamer X1</h2>
          <p class="text-sm text-gray-400">Código: 10023</p>
          <p class="text-sm text-gray-400 mb-4">Unidad: 30</p>
          
          <!-- Botones en la esquina inferior derecha -->
          <div class="absolute bottom-4 right-4 flex gap-2">
            <button
              class="h-10 cursor-pointer rounded-lg bg-green-400 px-3 text-white hover:bg-green-500 transition-colors"
              title="Visualizar producto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34zM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              class="h-10 cursor-pointer rounded-lg bg-violet-600 hover:bg-violet-700 px-3 text-white  transition-colors"
              title="Editar producto"
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
          </div>
        </div>
      </div>

      @if (mostrarFormularioRegistro()) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" (click)="cerrarFormulario()">
          <div class="relative max-w-2xl w-full mx-4" (click)="$event.stopPropagation()">
            <app-formulario (cerrarFormulario)="cerrarFormulario()"></app-formulario>
          </div>
        </div>
      }

      
    </main>
  `,
})
export class ProductsPage {
  public mostrarFormularioRegistro = signal<boolean>(false);

  mostrarFormulario() {
    this.mostrarFormularioRegistro.set(true);
  }

  cerrarFormulario() {
    this.mostrarFormularioRegistro.set(false);
  }
}
