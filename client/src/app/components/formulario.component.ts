import { Component, Output, EventEmitter, output } from '@angular/core';
@Component({
  selector: 'app-formulario',
  template: `
    <!-- Formulario Registro/Actualización -->
    <div class="bg-[#1E1D24] rounded-xl p-8 max-w-xl mx-auto relative">
      <button 
        class="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
        (click)="cerrar()"
      >
        ×
      </button>
      <h2 class="text-3xl font-bold mb-6">Registrar/Actualizar Producto</h2>
      <form class="space-y-5">
        <div>
          <label class="block text-sm mb-1">Nombre</label>
          <input
            type="text"
            class="w-full px-4 py-3 bg-[#2A2933] rounded-lg focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label class="block text-sm mb-1">Código</label>
          <input
            type="number"
            class="w-full px-4 py-3 bg-[#2A2933] rounded-lg focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label class="block text-sm mb-1">Descripción</label>
          <textarea
            class="w-full px-4 py-3 bg-[#2A2933] rounded-lg focus:ring-2 focus:ring-violet-500"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm mb-1">Unidad (0-100)</label>
          <input type="range" min="0" max="100" class="w-full" />
        </div>
        <div>
          <label class="block text-sm mb-1">Categoría</label>
          <select
            class="w-full px-4 py-3 bg-[#2A2933] rounded-lg focus:ring-2 focus:ring-violet-500"
          >
            <option>Laptops</option>
            <option>Monitores</option>
            <option>Periféricos</option>
            <option>Accesorios</option>
          </select>
        </div>
        <div>
          <label class="block text-sm mb-1">Imagen del producto</label>
          <input type="file" accept="image/*" class="w-full text-gray-300" />
        </div>
        <button
          class="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-lg font-semibold"
        >
          Guardar Producto
        </button>
      </form>
    </div>
  `,
})
export class FormularioComponent {
  public cerrarFormulario = output<boolean>();

  cerrar() {
    this.cerrarFormulario.emit(true);
  }
}
