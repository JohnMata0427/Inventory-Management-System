import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  imports: [RouterLink, ReactiveFormsModule],
  standalone: true,
  template: `
    <body
      class="bg-[#15141A] text-white h-screen w-screen m-0 flex overflow-hidden"
    >
      <!-- Panel de imagen -->
      <div
        class="w-1/2 h-full bg-cover bg-center relative"
        style="background-image: url('fondoLogin.webp');"
      ></div>

      <!-- Panel de formulario -->
      <div
        class="w-1/2 h-full bg-[#1E1D24] flex flex-col justify-center items-center p-8 md:p-16"
      >
        <div class="w-full max-w-md">
          <h1 class="text-4xl font-bold mb-8 text-center">Crear una cuentas</h1>

          <form
            [formGroup]="formRegistro"
            (ngSubmit)="onSubmit()"
            class="space-y-5"
          >
            <div>
              <label class="block mb-1 text-sm">Nombre</label>
              @let nombreInvalido = (formRegistro.get('nombre')?.invalid &&
              formRegistro.get('nombre')?.value) || errores().nombre;
              <div class="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 26 26"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <path
                    fill="currentColor"
                    d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557"
                  />
                </svg>
                <input
                  type="text"
                  formControlName="nombre"
                  placeholder="Nombre"
                  class="w-full pl-12 pr-4 py-3 bg-[#2A2933] rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 text-white"
                  [class]="
                    nombreInvalido
                      ? 'border-red-600 text-red-600 outline-red-600'
                      : 'outline-gris-300 border-[#878787]'
                  "
                />
                @if (errores().nombre) {
                <small class="text-red-600">Este campo es obligatorio.</small>
                } @else if (nombreInvalido) {
                <small class="text-red-600">
                  El nombre no es válido (Ej. John)
                </small>
                }
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm">Correo electrónico</label>
              @let emailInvalido = (formRegistro.get('email')?.invalid &&
              formRegistro.get('email')?.value) || errores().email;
              <div class="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                  [class]="
                    emailInvalido
                      ? 'border-red-600 text-red-600 outline-red-600'
                      : 'outline-gris-300 border-[#878787]'
                  "
                />
                @if (errores().email) {
                <small class="text-red-600">Este campo es obligatorio.</small>
                } @else if (emailInvalido) {
                <small class="text-red-600">
                  El correo electrónico no es válido (Ej.ejemplo&#64;gmail.com)
                </small>
                }
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm">Contraseña</label>
              @let passwordInvalido = (formRegistro.get('password')?.invalid &&
              formRegistro.get('password')?.value) || errores().password;
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
                  [class]="
                    passwordInvalido
                      ? 'border-red-600 text-red-600 outline-red-600'
                      : 'outline-gris-300 border-[#878787]'
                  "
                />
              </div>
              @if (errores().password) {
              <small class="text-red-600">Este campo es obligatorio.</small>
              } @else if (passwordInvalido) {
              <small class="text-red-600">
                Debe contener al menos una mayúscula, una minúscula, un número y
                un carácter especial (&#64;$!%*?&).
              </small>
              }
            </div>
            <div>
              <label class="block mb-1 text-sm">Confirmar contraseña</label>
              @let confirmarPasswordInvalido =
              (formRegistro.get('confirmarPassword')?.invalid &&
              formRegistro.get('confirmarPassword')?.value) ||
              errores().confirmarPassword;
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
                  formControlName="confirmPassword"
                  placeholder="********"
                  class="w-full pl-12 pr-4 py-3 bg-[#2A2933] rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 text-white"
                  [class]="
                    confirmarPasswordInvalido
                      ? 'border-red-600 text-red-600 outline-red-600'
                      : 'outline-gris-300 border-[#878787]'
                  "
                />
              </div>
            </div>

            <!-- Mostrar mensajes de error -->
            @if (errorMessage()) {
            <div class="text-red-600 text-sm">
              {{ errorMessage() }}
            </div>
            }
            <button
              type="submit"
              [disabled]="formRegistro.invalid || carga()"
              class="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors py-3 rounded-lg font-semibold"
            >
              {{ carga() ? 'Registrando...' : 'Registrarse' }}
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-gray-400">
            ¿Ya tienes una cuenta?
            <a
              routerLink="/iniciar-sesion"
              class="text-violet-400 hover:underline"
              >Inicia sesión</a
            >
          </div>
        </div>
      </div>

      <!-- Modal de éxito -->
      @if (mostrarModal()) {
      <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div
          class="bg-[#1E1D24] rounded-lg p-8 max-w-md w-full mx-4 border border-gray-600"
        >
          <div class="text-center">
            <!-- Icono de éxito -->
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
            >
              <svg
                class="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <h3 class="text-lg leading-6 font-medium text-white mb-2">
              ¡Registro exitoso!
            </h3>
            <p class="text-sm text-gray-300 mb-6">
              {{ mensajeExito() }}
            </p>

            <button
              (click)="closeModal()"
              class="w-full bg-violet-600 hover:bg-violet-700 transition-colors py-2 px-4 rounded-lg font-semibold text-white"
            >
              OK
            </button>
          </div>
        </div>
      </div>
      }
    </body>
  `,
})
export class RegisterPage {
  private router = inject(Router);
  public serviceAuth = inject(AuthService);

  public passwordVisible = signal<boolean>(false);
  public carga = signal<boolean>(false);
  public errorMessage = signal<string>('');
  public mostrarModal = signal<boolean>(false);
  public mensajeExito = signal('');

  //variables para los mensajes de error
  public errores = signal<any>({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //Validacion personalizado para compara contrasenas
  validacionPassword: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    // No mostrar error si alguno de los campos está vacío
    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
  // Validador personalizado para la fortaleza de la contraseña
  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmarPassword')?.value;

    // No mostrar error si alguno de los campos está vacío
    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { mismatch: true };
  };

  public formRegistro = new FormGroup(
    {
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );

  borrarError(campo: string) {
    this.errores.update((prev) => ({
      ...prev,
      [campo]: '',
    }));
  }

  onSubmit() {
    console.log('Formulario enviado:', this.formRegistro.value);
    if (this.formRegistro.valid) {
      this.carga.set(true);
      this.errorMessage.set('');

      this.serviceAuth
        .register(
          this.formRegistro.value.nombre!,
          this.formRegistro.value.email!,
          this.formRegistro.value.password!
        )
        .subscribe({
          next: (response: any) => {
            this.carga.set(false);
            this.mensajeExito.set(response.message);
            this.mostrarModal.set(true);
            this.formRegistro.reset();
            console.log('✅ Registro exitoso:', response);
          },
          error: (error: any) => {
            this.carga.set(false);
            console.error('❌ Error en el registro 2:', error);
          },
        });
    } else {
      this.errorMessage.set(
        'Por favor, completa todos los campos correctamente'
      );
    }
  }

  closeModal() {
    this.mostrarModal.set(false);
    this.router.navigate(['/iniciar-sesion']);
  }
}
