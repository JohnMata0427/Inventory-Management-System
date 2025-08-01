import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../env/environment';

interface respuestaLogin {
  token: string;
}

interface respuestaRegistro {
  message: string;
  userId: number;
}

interface perfilUsuario {
  id: number;
  nombre: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);

  public datosUsuario = signal<perfilUsuario>({
    id: 0,
    nombre: '',
    email: '',
  });

  public cargaPerfil = signal<boolean>(true);
  public clienteAutenticado = signal<boolean>(false);

  constructor() {
    this.obtenerPerfil()
      .subscribe()
      .add(() => this.cargaPerfil.set(false));
  }

  login(email: string, password: string) {
    return this.http
      .post<respuestaLogin>(`${this.urlBackend}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap(({ token }) => {
          if (token) {
            localStorage.setItem('token', token);
          }
        })
      );
  }

  register(
    nombre: string,
    email: string,
    password: string
  ): Observable<respuestaLogin> {
    return this.http
      .post<respuestaLogin>(`${this.urlBackend}/auth/register`, {
        nombre,
        email,
        password,
      })
      .pipe(
        tap({
          next: (response) => {
            console.log('✅ Respuesta exitosa del servidor:', response);
          },
          error: (error) => {
            console.error('❌ Error en la petición HTTP:', error);
          },
        })
      );
  }

  // Obtener perfil del usuario autenticado
  obtenerPerfil() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return new Observable(observer => {
        observer.error('No hay token');
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<perfilUsuario>(`${this.urlBackend}/auth/perfil`, { headers }).pipe(
      tap((perfil) => {
        this.datosUsuario.set(perfil);
        this.clienteAutenticado.set(true);
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.clienteAutenticado.set(false);
    this.datosUsuario.set({
      id: 0,
      nombre: '',
      email: '',
    });
  }

}
