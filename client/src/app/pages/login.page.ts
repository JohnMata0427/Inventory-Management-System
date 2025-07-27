import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <main
      class="bg-[#15141A] text-white h-screen w-screen m-0 flex overflow-hidden"
    >
      <div
        class="w-1/2 h-full bg-cover bg-center relative"
        style="background-image: url('fondoLogin.webp');"
      ></div>

      <div
        class="w-1/2 h-full bg-[#1E1D24] flex flex-col justify-center items-center p-8 md:p-16"
      >
        <div class="w-full max-w-md">
          <h1 class="text-4xl font-bold mb-8 text-center">Iniciar sesión</h1>

          <form
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
            class="space-y-5"
          >
            <div>
              <label class="block mb-1 text-sm">Correo electrónico</label>
              <div class="relative">
               
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <path
                    fill="currentColor"
                    d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z"
                  />
                </svg>
                <input
                  type="email"
                  formControlName="email"
                  placeholder="ejemplo@correo.com"
                  class="w-full pl-12 pr-4 py-3 bg-[#2A2933] rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 text-white"
                 
                />
              </div>
              <!-- Mensaje de error para email -->
              @if (error().email && typeof error().email === 'string') {
              <small class="text-red-600 block mt-1">{{ error().email }}</small>
              } @else if (loginForm.get('email')?.hasError('required') &&
              loginForm.get('email')?.touched) {
              <small class="text-red-600 block mt-1"
                >Este campo es obligatorio.</small
              >
              } @if (loginForm.get('email')?.hasError('email') &&
              loginForm.get('email')?.touched) {
              <small class="text-red-600 block mt-1"
                >El formato del correo electrónico no es válido.</small
              >
              }
            </div>
            <div>
              <label class="block mb-1 text-sm">Contraseña</label>
              <div class="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M5.25 10.055V8a6.75 6.75 0 0 1 13.5 0v2.055c1.115.083 1.84.293 2.371.824C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16s0-4.243.879-5.121c.53-.531 1.256-.741 2.371-.824M6.75 8a5.25 5.25 0 0 1 10.5 0v2.004Q16.676 9.999 16 10H8q-.677-.001-1.25.004zM8 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2m4 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2m5-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  formControlName="password"
                  placeholder="********"
                  class="w-full pl-12 pr-4 py-3 bg-[#2A2933] rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 text-white"
                  
                />
              </div>
              <!-- Mensaje de error para password -->
              @if (loginForm.get('password')?.hasError('required') &&
              loginForm.get('password')?.touched) {
              <small class="text-red-600 block mt-1"
                >Este campo es obligatorio.</small
              >
              }
            </div>

            @if (error().password && typeof error().password === 'string') {
            <small class="text-red-600 block mt-1">{{
              error().password
            }}</small>
            }

            <button
              type="submit"
              [disabled]="loginForm.invalid || carga()"
              class="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors py-3 rounded-lg font-semibold "
            >
              {{ carga() ? 'Iniciando sesión...' : 'Entrar' }}
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-gray-400">
            ¿No tienes cuenta?
            <a routerLink="/registrarse" class="text-violet-400 hover:underline"
              >Regístrate</a
            >
          </div>
        </div>
      </div>
    </main>

  `,
})
export class LoginPage {
  private serviceAuth = inject(AuthService);
  private router = inject(Router);

  //modal
  public mostrarModal = signal<boolean>(false);
  public titulo = signal('');
  public mensaje = signal('');

  public passwordVisible = signal<boolean>(false);
  //variable de carga
  public carga = signal<boolean>(false);

  public error = signal<any>({
    email: '',
    password: '',
  });

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  borrarError() {
    this.error.set({
      email: '',
      password: '',
    });
  }
  cerrarModal() {
    this.mostrarModal.set(false);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.carga.set(true);
      this.borrarError(); // Limpiar errores previos

      this.serviceAuth
        .login(this.loginForm.value.email!, this.loginForm.value.password!)
        .subscribe({
          next: (response) => {
            this.carga.set(false);
            this.mostrarModal.set(true);
            this.titulo.set('¡Éxito!');
            this.mensaje.set('Inicio de sesión exitoso');
            this.router.navigate(['/productos']);
          },
          error: ({ error }: { error: any }) => {
            this.carga.set(false);
            console.error('Error completo:', error);

            // Manejar diferentes tipos de errores
            if (
              error.message &&
              error.message.includes('Credenciales inválidas')
            ) {
              this.error.set({
                email: '',
                password:
                  'Credenciales inválidas. Verifica tu email y contraseña.',
              });
            } else if (
              error.message &&
              error.message.includes('Usuario no encontrado')
            ) {
              this.error.set({
                email: '',
                password: 'No existe una cuenta con este email.',
              });
            } else {
              // Error general del servidor
              this.error.set({
                email: '',
                password: 'Error del servidor. Intenta nuevamente más tarde.',
              });
            }
            setTimeout(() => {
              this.borrarError();
            }, 5000);
          },
        });
    } else {
      this.error.set({
        email: this.loginForm.get('email')?.hasError('required')
          ? 'Este campo es obligatorio.'
          : '',
        password: this.loginForm.get('password')?.hasError('required')
          ? 'Este campo es obligatorio.'
          : '',
      });
      this.carga.set(false);

      // Marcar campos como touched para mostrar errores de validación
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });

      // Auto-limpiar después de 3 segundos
      setTimeout(() => {
        this.borrarError();
      }, 3000);
    }
  }
}
