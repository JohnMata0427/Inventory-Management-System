import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  imports: [RouterLink],
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
      <div class="max-w-4xl mx-auto">
        <!-- Botón de regreso -->
        <button
          [routerLink]="['/productos']"
          class="mb-6 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
        >
          ← Volver a productos
        </button>

        <!-- Contenido del producto -->
        @if(producto) {
        <div class="bg-[#2a2933] rounded-xl p-8">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Imagen del producto -->
            <div>
              <img
                [src]="producto.imagen"
                [alt]="producto.nombre"
                class="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <!-- Información del producto -->
            <div>
              <h1 class="text-3xl font-bold mb-4">{{ producto.nombre }}</h1>
              <div class="space-y-3">
                <p class="text-gray-300">
                  <span class="font-semibold">Código:</span>
                  {{ producto.codigo }}
                </p>
                <p class="text-gray-300">
                  <span class="font-semibold">Categoría:</span>
                  {{ producto.categoria }}
                </p>
                <p class="text-gray-300">
                  <span class="font-semibold">Unidad:</span>
                  {{ producto.unidad }}
                </p>
                @if(producto.descripcion) {
                <p class="text-gray-300">
                  <span class="font-semibold">Descripción:</span>
                  {{ producto.descripcion }}
                </p>
                }
              </div>
            </div>
          </div>
        </div>
        } @else {
        <div class="text-center">
          <p class="text-xl">Producto no encontrado</p>
        </div>
        }
      </div>
    </main>
  `,
})
export class DetalleProductoPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productsService = inject(ProductsService);

  public producto: any = null;

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.producto = this.productsService.productos().find((p) => p.id === id);

    if (!this.producto) {
      console.log('Producto no encontrado');
      // Opcional: redirigir de vuelta a productos si no se encuentra
      // this.router.navigate(['/productos']);
    }
  }
}
