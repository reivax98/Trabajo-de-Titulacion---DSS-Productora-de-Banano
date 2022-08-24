import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedLayoutComponent } from './components/authenticated-layout/authenticated-layout.component';
import { AnonymousLayoutComponent } from './components/anonymous-layout/anonymous-layout.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrazabilidadComponent } from './components/trazabilidad/trazabilidad.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { RegisterComponent } from './components/register/register.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FacProveedorComponent } from './components/fac-proveedor/fac-proveedor.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ExportadoraComponent } from './components/exportadora/exportadora.component';
import { TipoCajaComponent } from './components/tipo-caja/tipo-caja.component';
import { HaciendaComponent } from './components/hacienda/hacienda.component';
import { PagoComponent } from './components/pago/pago.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';

import { UserGuard } from './services/user.guard';

const routes: Routes = [
  {
    path: '', component: AnonymousLayoutComponent, children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      { 
        path: 'login', 
        component: LoginComponent 
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'new-password/:token',
        component: ResetPasswordComponent
      },
    ]
  },
  {
    path: '', component: AuthenticatedLayoutComponent, canActivate: [UserGuard], children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'facturacion',
        component: FacturacionComponent
      },
      {
        path: 'trazabilidad',
        component: TrazabilidadComponent
      },
      {
        path: 'empleado',
        component: EmpleadoComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'marcas',
        component: MarcasComponent
      },
      {
        path: 'fac-proveedor',
        component: FacProveedorComponent
      },
      {
        path: 'hacienda',
        component: HaciendaComponent
      },
      {
        path: 'pago',
        component: PagoComponent
      },
      {
        path: 'proveedor',
        component: ProveedorComponent
      },
      {
        path: 'tipo-caja',
        component: TipoCajaComponent
      },
      {
        path: 'exportadora',
        component: ExportadoraComponent
      },
      {
        path: 'lista-usuario',
        component: ListaUsuarioComponent
      },
      {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
