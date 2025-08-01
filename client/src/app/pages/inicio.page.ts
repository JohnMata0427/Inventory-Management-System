import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';

@Component({
  imports: [NgClass, TitleCasePipe, RouterLink],
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
      <main class="bg-[#1E1D24] text-white w-full  p-8"></main>
    </div>
  `,
})
export class InicioPage {
  public serviceAuth = inject(AuthService);
  public servicioRuta = inject(ActivatedRoute);
  public rutaActiva = computed(() => this.servicioRuta.snapshot.url[0]?.path);
  public router = inject(Router);

  constructor() {
    
    if (!this.serviceAuth.clienteAutenticado()) {
      this.serviceAuth.obtenerPerfil().subscribe();
    }
    
  }
  cerrarSesion() {
    this.serviceAuth.logout();
    this.router.navigate(['/iniciar-sesion']);
  }
}
