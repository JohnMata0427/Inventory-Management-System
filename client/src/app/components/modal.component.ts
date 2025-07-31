import {
  Component,
  effect,
  input,
  model,
  output,
  viewChild,
  type ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <dialog
      #modal
      class="backdrop:bg-gris-600/25 m-auto w-3/4 rounded-[10px] bg-[#1e1d24] text-[#3C3C3B] backdrop:backdrop-blur-[2px] lg:w-1/2"
    >
      <div class="p-8 rounded-lg">
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors duration-500"
          (click)="opened.set(false)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 class="text-center text-2xl font-bold text-white">{{ title() }}</h2>
        <p class="text-center text-gray-300">{{ content() }}</p>

        @if (type() === 'delete') {
        <div class="mt-4 flex justify-center items-center gap-4">
          <button
          class="mt-4 w-full h-10 rounded-lg bg-violet-600 hover:bg-violet-700 px-3 text-white transition-colors"
          (click)="opened.set(false); deleteItem.emit()"
        >
          Eliminar
        </button>
        <button
          class="mt-4 w-full h-10 rounded-lg bg-gray-600 hover:bg-gray-700 px-3 text-white transition-colors"
          (click)="opened.set(false)"
        >
          Cancelar
        </button>
        </div>
        }
      </div>
    </dialog>
  `,
})
export class ModalComponent {
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public opened = model<boolean>(false);
  public type = input<'delete' | 'info'>('info');

  public title = input<string>('');
  public content = input<string>('');

  // Para eliminar
  public deleteItem = output<void>();

  constructor() {
    effect(() => {
      const dialogElement = this.modal()?.nativeElement;

      if (dialogElement && this.opened()) {
        dialogElement.showModal();
      } else if (dialogElement) {
        dialogElement.close();
      }
    });
  }
}
