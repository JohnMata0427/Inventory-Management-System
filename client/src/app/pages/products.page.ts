import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  Actions,
  FormularioComponent,
} from '../components/formulario.component';
import { ProductsService, type Producto } from '../services/products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../components/modal.component';
import { AuthService } from '../services/auth.service';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  imports: [
    FormularioComponent,
    RouterLink,
    ModalComponent,
    TitleCasePipe,
    NgClass,
  ],
  template: `
    <div class="flex h-screen">
      <header class="min-h-screen w-96 flex  justify-center bg-[#2a2933] p-6">
        <div class="flex flex-col items-center">
          <img class="h-8 mb-10" src="logoFinal.png" alt="" />
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

          <span class="text-white font-bold text-[22px]">{{
            serviceAuth.datosUsuario().nombre | titlecase
          }}</span>
          <small class="text-white font-light text-[15px]">{{
            serviceAuth.datosUsuario().email
          }}</small>

          <ul class="text-white mt-10 gap-2 flex flex-col">
            <li>
              <a
                class="flex w-[240px] items-center gap-6 rounded-3xl py-3 pl-6 font-normal transition-colors duration-initial hover:bg-[#594686e8]  text-white"
                routerLink="/inicio"
                [ngClass]="{
                'bg-[#6c08de] fill-white ':
                  rutaActiva() === 'inicio',
                'text-[#3C3C3B]': rutaActiva() !== 'inicio',
              }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffffff"
                    d="M11.336 2.253a1 1 0 0 1 1.328 0l9 8a1 1 0 0 1-1.328 1.494L20 11.45V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.55l-.336.297a1 1 0 0 1-1.328-1.494zM6 9.67V19h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3V9.671l-6-5.333zM13 19v-4h-2v4z"
                  />
                </svg>
                Inicio
              </a>
            </li>
            <li>
              <a
                class="flex w-[240px] items-center gap-6 rounded-3xl py-3 pl-6 font-normal transition-colors duration-initial hover:bg-[#594686e8]  text-white"
                routerLink="/productos"
                [ngClass]="{
                'bg-[#6c08de] fill-white ':
                  rutaActiva() === 'productos',
                'text-[#3C3C3B]': rutaActiva() !== 'productos',
              }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#ffffff"
                    d="M30.48 21.33H1.52V1.52H0V25.9h1.52v1.52h9.15v1.53h1.52v-1.53h7.62v1.53h1.52v-1.53h9.15V25.9H32V1.52h-1.52z"
                  />
                  <path
                    fill="#ffffff"
                    d="M22.86 9.14h1.52V7.61h1.52V6.09h-1.52V4.57h-1.52v1.52h-1.53v1.52h1.53zM10.67 30.47v-1.52H9.14V32h13.72v-3.05h-1.53v1.52zm9.14-19.81h1.52v1.53h-1.52Zm-9.14 4.57h10.66v1.53H10.67Zm0-4.57h1.52v1.53h-1.52ZM1.52 0h28.96v1.52H1.52Z"
                  />
                </svg>
                Productos
              </a>
            </li>
            <li (click)="cerrarSesion()">
              <a
                class="flex w-[240px] items-center gap-6 rounded-3xl py-3 pl-6 font-normal transition-colors duration-initial hover:bg-[#594686e8]  text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                >
                  <g fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd">
                    <path
                      d="M15.027 7.232a1 1 0 0 1 1.408.128l2.083 2.5a1 1 0 0 1-1.536 1.28l-2.083-2.5a1 1 0 0 1 .128-1.408"
                    />
                    <path
                      d="M15.027 13.768a1 1 0 0 1-.129-1.408l2.084-2.5a1 1 0 1 1 1.536 1.28l-2.083 2.5a1 1 0 0 1-1.408.128"
                    />
                    <path
                      d="M17.5 10.5a1 1 0 0 1-1 1H10a1 1 0 1 1 0-2h6.5a1 1 0 0 1 1 1M3 3.5a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 14a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
                    />
                    <path
                      d="M13 2.5a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1m0 10a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1m-9-10a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0v-14a1 1 0 0 1 1-1"
                    />
                  </g>
                </svg>
                Salir
              </a>
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
              #searchInput
              type="search"
              placeholder="Buscar por nombre o código"
              class="w-full pl-12 pr-4 py-3 rounded-lg bg-[#2A2933] text-white focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
              (input)="search.set(searchInput.value)"
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
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 overflow-y-auto  h-[500px] p-2"
        >
          @for(producto of serviceProductos.productos(); track $index) {

          <div
            [routerLink]="['/detalle-producto', producto.id]"
            class=" bg-[#2a2933] rounded-xl p-4 hover:ring-2 hover:ring-violet-500 transition relative"
          >
            <img
              [src]="producto.imagen"
              alt="Producto"
              class="rounded-lg mb-4 h-60 w-full object-cover"
            />
            <div class="text-gray-300 text-sm mb-1">
              {{ producto.categoria | titlecase }}
            </div>
            <h2 class="text-2xl font-bold">
              {{ producto.nombre | titlecase }}
            </h2>
            <p class="text-sm text-gray-400">Código: {{ producto.codigo }}</p>
            <p class="text-sm text-gray-400 mb-4">
              Unidad: {{ producto.unidad }}
            </p>

            <!-- Botones en la esquina inferior derecha -->
            <div class="absolute bottom-4 right-4 flex gap-2">
              <button
                class="h-10 cursor-pointer rounded-lg bg-violet-600 hover:bg-violet-700 px-3 text-white  transition-colors"
                title="Editar producto"
                (click)="actualizarProducto(producto); $event.stopPropagation()"
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
                (click)="
                  solicitarEliminacion(producto.id); $event.stopPropagation()
                "
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
          } @empty {
          <div class="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              class="mx-auto mb-4 text-gray-400"
            >
              <path
                fill="currentColor"
                d="m4.425 4.04l.96.96h-.77q-.23 0-.423.192T4 5.616v9.769q0 .269.173.442t.443.173h10.353L1.777 2.808l.708-.708l18.684 18.685l-.707.707L15.969 17H13v2h2v1H9v-1h2v-2H4.616q-.691 0-1.153-.462T3 15.385v-9.77q0-.713.463-1.144t.962-.43m15.64 12.809l-.85-.85h.266q.192-.039.355-.192q.164-.154.164-.423v-9.77q0-.269-.173-.442T19.385 5H8.215l-1-1h12.17q.69 0 1.153.463T21 5.616v9.769q0 .496-.257.89t-.677.575m-10.37-6.123"
              />
            </svg>
            <p class="text-gray-400">No se encontraron productos</p>
          </div>
          }
        </div>

        <app-formulario
          [(mostrarModal)]="mostrarModal"
          [acciones]="accionAsignada()"
          [datos]="datosParaActualizar()"
        ></app-formulario>

        <app-modal
          [(opened)]="mostrarConfirmacion"
          type="delete"
          title="Confirmar eliminación"
          content="¿Estás seguro de que deseas eliminar este producto?"
          (deleteItem)="eliminarProducto()"
        />
      </main>
    </div>
  `,
})
export class ProductsPage {
  public serviceProductos = inject(ProductsService);
  public accionAsignada = signal<Actions>('Registrar');
  public mostrarModal = signal<boolean>(false);
  public serviceAuth = inject(AuthService);
  public router = inject(Router);
  public servicioRuta = inject(ActivatedRoute);
  public rutaActiva = computed(() => this.servicioRuta.snapshot.url[0]?.path);

  public search = signal<string>('');

  // Para actualizar un producto, se necesita un objeto Producto con los datos a actualizar
  public datosParaActualizar = signal<Producto>({} as Producto);

  // Para eliminar un producto, se necesita el ID del producto a eliminar
  public mostrarConfirmacion = signal<boolean>(false);
  public idParaEliminar = signal<number>(0);

  constructor() {
    if (!this.serviceAuth.clienteAutenticado()) {
      this.serviceAuth.obtenerPerfil().subscribe();
    }
    effect(() => {
      const search = this.search();
      const esCodigo = search.match(/^\d+$/);

      let codigo = esCodigo ? search : '';
      let nombre = esCodigo ? '' : search;

      this.serviceProductos.obtenerProductos(nombre, codigo).subscribe();
    });
  }

  mostrarFormulario() {
    this.mostrarModal.set(true);
    this.accionAsignada.set('Registrar');
  }

  actualizarProducto(producto: Producto) {
    this.mostrarModal.set(true);
    this.accionAsignada.set('Actualizar');
    this.datosParaActualizar.set(producto);
  }

  solicitarEliminacion(id: number) {
    this.mostrarConfirmacion.set(true);
    this.idParaEliminar.set(id);
  }

  eliminarProducto() {
    const id = this.idParaEliminar();
    if (id) {
      this.serviceProductos.eliminarProducto(id).subscribe();
    }
  }
  cerrarSesion() {
    this.serviceAuth.logout();
    this.router.navigate(['/iniciar-sesion']);
  }
}
