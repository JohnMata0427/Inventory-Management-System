import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { ProductsPage } from './pages/products.page';

export const routes: Routes = [
  {
    path:'iniciar-sesion', component: LoginPage
  },
  {
    path: 'registrarse', component: RegisterPage
  },
  {
    path: 'productos', component: ProductsPage
  },
  {
    path: '**', redirectTo: 'iniciar-sesion', pathMatch: 'full'
  }
];
