import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
