import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../env/environment';
import { tap } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  unidad: number;
  categoria: Categoria;
  imagen: string;
  publicId: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export enum Categoria {
  Laptops = 'Laptops',
  CPU = 'CPU',
  Mouses = 'Mouses',
  Teclados = 'Teclados',
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  public productos = signal<Producto[]>([]);

  constructor() {
    this.obtenerProductos('', '').subscribe();
  }

  obtenerProductos(nombre: string, codigo: string) {
    return this.http
      .get<Producto[]>(`${this.urlBackend}/productos`, {
        params: {
          nombre,
          codigo,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((response) => {
          this.productos.set(response);
          console.log('Productos obtenidos:', response);
        })
      );
  }
  crearProductos(
    datos: FormData
  ) {
    return this.http
      .post<Producto>(`${this.urlBackend}/productos`, datos, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((response) => {
          this.productos.update((prev) => [...prev, response]);
        })
      );
  }
  actualizarProducto(datos: FormData, id: number) {
    return this.http
      .put<Producto>(`${this.urlBackend}/productos/${id}`, datos, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((response) => {
          this.productos.update((prev) =>
            prev.map((producto) =>
              producto.id === id ? response : producto
            )
          );
          console.log('Producto actualizado:', response);
        })
      );
  }
  eliminarProducto(id: number) {
    return this.http.delete(`${this.urlBackend}/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).pipe(
      tap(() => {
        this.productos.update((prev) => prev.filter((producto) => producto.id !== id));
      })
    );
  }
}
