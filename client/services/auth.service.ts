import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { usuario } from '../interface/usuario.interface';
import { environment } from '../src/env/environment';

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


  public datosUsuario = signal<usuario>({
    _id: '',
    nombre: '',
    email: '',
  });
  public cargaPerfil = signal<boolean>(true);
  public clienteAutenticado = signal<boolean>(false);
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
  ): Observable<respuestaRegistro> {
    
    
    return this.http
      .post<respuestaRegistro>(`${this.urlBackend}/auth/register`, {
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
            
          }
        })
      );
  }

  // Obtener perfil del usuario autenticado
  getPerfil(): Observable<perfilUsuario> {
    return this.http
      .get<perfilUsuario>(`${this.urlBackend}/auth/perfil`)
      .pipe(
        tap((user) => {
          this.datosUsuario.set({
            _id: user.id?.toString() || '',
            nombre: user.nombre,
            email: user.email,
          });
          this.clienteAutenticado.set(true);
          this.cargaPerfil.set(false);
        })
      );
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.clienteAutenticado.set(false);
    this.datosUsuario.set({
      _id: '',
      nombre: '',
      email: '',
    });
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
