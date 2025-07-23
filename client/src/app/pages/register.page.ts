import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
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
          <h1 class="text-4xl font-bold mb-8 text-center">Crear una cuenta</h1>
          
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <div>
              <label class="block mb-1 text-sm">Nombre completo</label>
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
                  placeholder="Tu nombre"
                  class="w-full pl-12 pr-4 py-3 bg-[#2A2933] rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 text-white"
                  [class.border-red-500]="
                    registerForm.get('nombre')?.invalid &&
                    registerForm.get('nombre')?.touched
                  "
                />
              </div>
              <!-- Mensaje de error para nombre -->
              @if (registerForm.get('nombre')?.invalid &&
              registerForm.get('nombre')?.touched) {
              <div class="text-red-400 text-xs mt-1">
                @if (registerForm.get('nombre')?.errors?.['required']) {
                <span>El nombre es requerido</span>
                }
                @if (registerForm.get('nombre')?.errors?.['minlength']) {
                <span>El nombre debe tener entre 3 y 20 caracteres</span>
                }
                @if (registerForm.get('nombre')?.errors?.['maxlength']) {
                <span>El nombre debe tener entre 3 y 20 caracteres</span>
                }
                @if (registerForm.get('nombre')?.errors?.['pattern']) {
                <span>El nombre solo puede contener caracteres alfabéticos y espacios</span>
                }
              </div>
              }
            </div>
            <div>
              <label class="block mb-1 text-sm">Correo electrónico</label>
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
                  [class.border-red-500]="
                    registerForm.get('email')?.invalid &&
                    registerForm.get('email')?.touched
                  "
                />
              </div>
              <!-- Mensaje de error para email -->
              @if (registerForm.get('email')?.invalid &&
              registerForm.get('email')?.touched) {
              <div class="text-red-400 text-xs mt-1">
                @if (registerForm.get('email')?.errors?.['required']) {
                <span>El email es requerido</span>
                } @if (registerForm.get('email')?.errors?.['email']) {
                <span>Ingresa un email válido</span>
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
                    registerForm.get('password')?.invalid &&
                    registerForm.get('password')?.touched
                  "
                />
              </div>
              <!-- Mensaje de error para password -->
              @if (registerForm.get('password')?.invalid &&
              registerForm.get('password')?.touched) {
              <div class="text-red-400 text-xs mt-1">
                @if (registerForm.get('password')?.errors?.['required']) {
                <span>La contraseña es requerida</span>
                }
                @if (registerForm.get('password')?.errors?.['minlength']) {
                <span>La contraseña debe tener al menos 6 caracteres</span>
                }
                @if (registerForm.get('password')?.errors?.['noNumber']) {
                <span>La contraseña debe contener al menos un número</span>
                }
                @if (registerForm.get('password')?.errors?.['noLetter']) {
                <span>La contraseña debe contener al menos una letra</span>
                }
              </div>
              }
            </div>
            <div>
              <label class="block mb-1 text-sm">Confirmar contraseña</label>
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
                  [class.border-red-500]="
                    registerForm.get('confirmPassword')?.invalid &&
                    registerForm.get('confirmPassword')?.touched
                  "
                />
              </div>
              <!-- Mensaje de error para confirmPassword -->
              @if (registerForm.get('confirmPassword')?.invalid &&
              registerForm.get('confirmPassword')?.touched) {
              <div class="text-red-400 text-xs mt-1">
                @if (registerForm.get('confirmPassword')?.errors?.['required']) {
                <span>Confirma tu contraseña</span>
                } @if (registerForm.errors?.['passwordMismatch']) {
                <span>Las contraseñas no coinciden</span>
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
              [disabled]="registerForm.invalid || isLoading()"
              class="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors py-3 rounded-lg font-semibold"
            >
              {{ isLoading() ? 'Registrando...' : 'Registrarse' }}
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
      @if (showSuccessModal()) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-[#1E1D24] rounded-lg p-8 max-w-md w-full mx-4 border border-gray-600">
            <div class="text-center">
              <!-- Icono de éxito -->
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h3 class="text-lg leading-6 font-medium text-white mb-2">
                ¡Registro exitoso!
              </h3>
              <p class="text-sm text-gray-300 mb-6">
                Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.
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
export class RegisterPage implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Estado del componente usando signals
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  showSuccessModal = signal<boolean>(false);

  // Formulario reactivo con validaciones que coinciden con el backend
  registerForm: FormGroup = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z\s]+$/) // Solo letras y espacios
    ]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      this.passwordComplexityValidator // Validador personalizado para número y letra
    ]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: this.passwordMatchValidator
  });

  ngOnInit() {  
    // Escuchar cambios en el formulario para limpiar mensajes de error
    this.registerForm.valueChanges.subscribe(() => {
      if (this.errorMessage()) {
        console.log('🧹 Limpiando mensaje de error');
        this.errorMessage.set('');
      }
    });
  }

  // Validador personalizado para confirmar contraseñas
  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Validador personalizado para complejidad de contraseña (igual que backend)
  passwordComplexityValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    // Verificar si tiene al menos un número
    const hasNumber = /\d/.test(value);
    // Verificar si tiene al menos una letra
    const hasLetter = /[A-Za-z]/.test(value);

    if (!hasNumber) {
      return { noNumber: true };
    }
    if (!hasLetter) {
      return { noLetter: true };
    }

    return null;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control?.errors) {
        console.log(`Errores en ${key}:`, control.errors);
      }
    });

    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const { nombre, email, password } = this.registerForm.value;
      console.log('Datos a enviar:', { nombre, email, password: '***' });

      this.authService.register(nombre, email, password).subscribe({
        next: (response) => {
          console.log('✅ Registro exitoso:', response);
          this.isLoading.set(false);
          this.showSuccessModal.set(true);
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('❌ Error en registro:', error);
        }
      });
    } else {
      console.log('❌ Formulario inválido, marcando campos como tocados');
      this.registerForm.markAllAsTouched();
    }
  }

  // Método para cerrar el modal y redirigir al login
  closeModal() {
    this.showSuccessModal.set(false);
    this.router.navigate(['/iniciar-sesion']);
  }
}
