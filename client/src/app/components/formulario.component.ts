import {
  Component,
  Output,
  EventEmitter,
  output,
  input,
  model,
  effect,
  viewChild,
  ElementRef,
  signal,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
export type Actions = 'Registrar' | 'Actualizar' | 'Visualizar';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulario',
  template: `
    <!-- Formulario Registro/Actualización -->
    <dialog
      #modal
      class="backdrop:bg-gris-600/25 m-auto w-3/4 rounded-[10px] bg-[#1e1d24] text-[#3C3C3B] backdrop:backdrop-blur-[2px] lg:w-1/2"
    >
      <div class="flex items-center justify-between px-7 py-5">
        <div class="flex flex-col">
          <h1 class="text-lg font-medium text-white">
            {{
              acciones() === 'Visualizar'
                ? 'Detalles del ingrediente'
                : acciones() === 'Actualizar'
                ? 'Actualizar ingrediente'
                : 'Registrar ingrediente'
            }}
          </h1>
        </div>
        <button
          (click)="this.mostrarModal.set(false)"
          class="cursor-pointer focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 512 512"
          >
            <path
              fill="#3C3C3B"
              d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34Z"
            />
          </svg>
        </button>
      </div>
      <form class="space-y-5 text-white px-7" [formGroup]="formProducto" (ngSubmit)="onSubmit()">
        <label>
          @let imagenInvalida = (formProducto.get('imagen')?.invalid &&
          formProducto.get('imagen')?.value) || errores().imagen;
          <label class="block text-sm mb-1">Imagen del producto</label>
          <div
            class="flex h-47 flex-col items-center justify-center rounded-xl border border-gray-300 mt-2"
            [class]="
              imagenInvalida
                ? 'border-red-500 focus:ring-0 focus:outline-none'
                : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
            "
          >
            @if (imagePreview !== null) {
            <img
              [src]="imagePreview"
              alt="Imagen del ingrediente"
              class="h-full w-full rounded-xl object-contain"
            />
            } @else {
            <div class="flex cursor-pointer flex-col items-center gap-2">
              <svg
                class=""
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#3C3C3B"
                  d="m11.18 8.933 3.232-5.596q2.025.522 3.662 2.046t2.38 3.55zM8.888 11.26 5.673 5.606Q6.946 4.358 8.57 3.679T12 3q.383 0 .875.047t.746.097zm-5.6 2.97q-.15-.638-.219-1.176T3 12q0-1.583.537-3.042.536-1.46 1.567-2.74l4.588 8.013zm6.404 6.472q-2.141-.561-3.82-2.104-1.679-1.542-2.344-3.588h9.402zM12 21q-.375 0-.81-.05t-.71-.1l4.71-7.994 3.156 5.519q-1.254 1.248-2.897 1.937T12 21m6.896-3.217L14.308 9.73h6.406q.13.58.208 1.158T21 12q0 1.616-.536 3.062-.535 1.446-1.568 2.72"
                />
              </svg>
              <span>Subir una imagen</span>
            </div>
            }
            <input
              type="file"
              hidden
              accept="image/*"
              id="foto"
              (change)="onFileChange($event)"
            />
          </div>
        </label>
        @let nombreInvalido = (formProducto.get('nombre')?.invalid &&
        formProducto.get('nombre')?.value) || errores().nombre;
        <div>
          <label class="block text-sm mb-1">Nombre</label>
          <input
            type="text"
            (input)="borrarError('nombre')"
            formControlName="nombre"
            class="w-full px-4 py-3 bg-[#2A2933] rounded-lg focus:ring-2 focus:ring-violet-500"
            [class]="
              nombreInvalido
                ? 'border-red-500 focus:ring-0 focus:outline-none'
                : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
            "
          />
        </div>
        @if(errores().nombre) {
        <small class="text-red-600">
          {{ errores().nombre }}
        </small>
        } @else if (nombreInvalido) {
        <small class="text-red-600">
          <div class="w-[215px]">
            El nombre debe contener entre 3 y 25 caracteres alfabéticos.
          </div>
        </small>
        }
        <div>
          @let codigoInvalido = (formProducto.get('codigo')?.invalid &&
          formProducto.get('codigo')?.value) || errores().codigo;
          <label class="block text-sm mb-1">Código</label>
          <input
            type="text"
            (input)="borrarError('codigo')"
            formControlName="codigo"
            class="w-full px-4 py-3 bg-[#2A2933] rounded-lg focus:ring-2 focus:ring-violet-500"
            [class]="
              codigoInvalido
                ? 'border-red-500 focus:ring-0 focus:outline-none'
                : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
            "
          />
        </div>
        @if(errores().codigo) {
        <small class="text-red-600">
          {{ errores().codigo }}
        </small>
        } @else if (codigoInvalido) {
        <small class="text-red-600">
          <div class="w-[215px]">
            El código es requerido.
          </div>
        </small>
        }
        <div>
          @let descripcionInvalida = (formProducto.get('descripcion')?.invalid
          && formProducto.get('descripcion')?.value) || errores().descripcion;
          <label class="block text-sm mb-1">Descripción</label>
          <textarea
            class="w-full px-4 py-3 bg-[#2A2933] rounded-lg focus:ring-2 focus:ring-violet-500"
            (input)="borrarError('descripcion')"
            formControlName="descripcion"
            [class]="
              codigoInvalido
                ? 'border-red-500 focus:ring-0 focus:outline-none'
                : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
            "
          ></textarea>
        </div>
        @if(errores().descripcion) {
        <small class="text-red-600">
          {{ errores().descripcion }}
        </small>
        } @else if (descripcionInvalida) {
        <small class="text-red-600">
          <div class="w-[215px]">
            La descripción debe contener entre 10 y 500 caracteres.
          </div>
        </small>
        }
        <div>
          <label class="block text-sm mb-1">Unidad (1-100)</label>
          <input type="range" min="1" max="100" class="w-full" formControlName="unidad"/>
        </div>
        <div>
          @let categoriaInvalida = (formProducto.get('categoria')?.invalid &&
          formProducto.get('categoria')?.value) || errores().categoria;
          <label class="block text-sm mb-1">Categoría</label>
          <select
            formControlName="categoria"
            class="w-full px-4 py-3 bg-[#2A2933] rounded-lg focus:ring-2 focus:ring-violet-500"
            [class]="
              categoriaInvalida
                ? 'border-red-500 focus:ring-0 focus:outline-none'
                : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
            "
            (change)="borrarError('categoria')"
          >
            <option value="Laptops">Laptops</option>
            <option value="CPU">CPU</option>
            <option value="Mouses">Mouses</option>
            <option value="Teclados">Teclados</option>
          </select>
          @if(errores().categoria) {
          <small class="text-red-600">
            {{ errores().categoria }}
          </small>
          }@else if(categoriaInvalida) {
          <small class="text-red-600"> La categoría es obligatoria. </small>
          }
        </div>

        <button
          class="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-lg font-semibold"
        >
          Guardar Producto
        </button>
      </form>
    </dialog>
  `,
})
export class FormularioComponent {
  public acciones = input.required<Actions>();
  public mostrarModal = model<boolean>(false);
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public imagePreview: string | ArrayBuffer | null = null;
  public serviceProductos = inject(ProductsService);

  constructor() {
    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }
    });
  }
  public formProducto = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), // Solo letras y espacios
    ]),
    codigo: new FormControl('', [
      Validators.required,
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
    unidad: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    categoria: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
  });
  public errores = signal<any>({
    nombre: '',
    codigo: '',
    descripcion: '',
    unidad: '',
    categoria: '',
    imagen: '',
  });
  borrarError(campo: string) {
    this.errores.update((prev) => ({ ...prev, [campo]: '' })); //setea los errores
  }
  public onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.formProducto.patchValue({
          imagen: file,
        });
        this.borrarError('imagen');
      };
      reader.readAsDataURL(file);
    }
  }

  public toFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.formProducto.value).forEach((key) => {
      const value = this.formProducto.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    return formData;

  }
  onSubmit() {
    const formData = this.toFormData();
    if(this.acciones()==='Registrar'){
      this.serviceProductos.crearProductos(formData).subscribe({
        next: (producto) => {
          console.log('Producto creado:', producto);
          this.mostrarModal.set(false);
        },
        error: (error) => {
          console.error('Error al crear producto:', error);
        }
      });
    }

  }
}
