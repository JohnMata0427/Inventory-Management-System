import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

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
                  [class.border-red-500]="
                    loginForm.get('email')?.invalid &&
                    loginForm.get('email')?.touched
                  "
                />
              </div>
              <!-- Mensaje de error para email -->
              @if (loginForm.get('email')?.invalid &&
              loginForm.get('email')?.touched) {
              <div class="text-red-400 text-xs mt-1">
                @if (loginForm.get('email')?.errors?.['required']) {
                <span>El email es obligatorio</span>
                } @if (loginForm.get('email')?.errors?.['email']) {
                <span>Formato de email inválido</span>
                }
              </div>
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
                  [class.border-red-500]="
                    loginForm.get('password')?.invalid &&
                    loginForm.get('password')?.touched
                  "
                />
              </div>
              <!-- Mensaje de error para password -->
              @if (loginForm.get('password')?.invalid &&
              loginForm.get('password')?.touched) {
              <div class="text-red-400 text-xs mt-1">
                @if (loginForm.get('password')?.errors?.['required']) {
                <span>La contraseña es obligatoria</span>
                }
              </div>
              }
            </div>
            <!-- Mostrar mensajes de error -->
            @if (errorMessage()) {
            <div class="text-red-600 text-sm">
              {{ errorMessage() }}
            </div>
            }
            <button
              type="submit"
              [disabled]="loginForm.invalid || isLoading()"
              class="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors py-3 rounded-lg font-semibold "
            >
              {{ isLoading() ? 'Iniciando sesión...' : 'Entrar' }}
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
export class LoginPage implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Estado del componente usando signals
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  // Formulario reactivo con validaciones que coinciden con el backend
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]], // Solo requerido para login
  });

  ngOnInit() {
    // Escuchar cambios en el formulario para limpiar mensajes de error
    this.loginForm.valueChanges.subscribe(() => {
      // Limpiar el mensaje de error cuando el usuario escriba algo
      if (this.errorMessage()) {
        this.errorMessage.set('');
      }
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.isLoading.set(false);
          // Redirigir a la página principal o dashboard
          this.router.navigate(['/productos']); // Cambia por la ruta que necesites
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.isLoading.set(false);

          // Manejar diferentes tipos de errores
          if (error.status === 401) {
            this.errorMessage.set(
              'Credenciales incorrectas. Verifica tu email y contraseña.'
            );
          } else if (error.status === 500) {
            this.errorMessage.set('Error en el servidor. Inténtalo más tarde.');
          } else {
            this.errorMessage.set(
              error.error?.message ||
                'Error al iniciar sesión. Inténtalo de nuevo.'
            );
          }
        },
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.loginForm.markAllAsTouched();
    }
  }
}
