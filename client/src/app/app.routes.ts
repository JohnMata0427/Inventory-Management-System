import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { ProductsPage } from './pages/products.page';
import { DetalleProductoPage } from './pages/detalleProducto.page';
import { InicioPage } from './pages/inicio.page';

export const routes: Routes = [
  {
    path:'iniciar-sesion', component: LoginPage
  },
  {
    path:'inicio', component: InicioPage
  },
  {
    path: 'registrarse', component: RegisterPage
  },
  {
    path: 'productos', component: ProductsPage
  },
  {
    path:'detalle-producto/:id', component: DetalleProductoPage
  },
  {
    path: '**', redirectTo: 'iniciar-sesion', pathMatch: 'full'
  }
];
