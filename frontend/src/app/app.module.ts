import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrazabilidadComponent } from './components/trazabilidad/trazabilidad.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { RegisterComponent } from './components/register/register.component';
import { LayoutModule } from './layout/layout.module';

import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';
import { MarcasComponent } from './components/marcas/marcas.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthenticatedLayoutComponent } from './components/authenticated-layout/authenticated-layout.component';
import { AnonymousLayoutComponent } from './components/anonymous-layout/anonymous-layout.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FacProveedorComponent } from './components/fac-proveedor/fac-proveedor.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ExportadoraComponent } from './components/exportadora/exportadora.component';
import { TipoCajaComponent } from './components/tipo-caja/tipo-caja.component';
import { HaciendaComponent } from './components/hacienda/hacienda.component';
import { PagoComponent } from './components/pago/pago.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TrazabilidadComponent,
    EmpleadoComponent,
    RegisterComponent,
    MarcasComponent,
    ForgotPasswordComponent,
    AuthenticatedLayoutComponent,
    AnonymousLayoutComponent,
    ResetPasswordComponent,
    FacProveedorComponent,
    FacturacionComponent,
    ProveedorComponent,
    ExportadoraComponent,
    TipoCajaComponent,
    HaciendaComponent,
    PagoComponent,
    ListaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    NgxPaginationModule
  ],
  providers: [
    UserService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
