import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPipesModule } from 'ng-pipes';
import { MomentModule } from 'ngx-moment';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { EtapaComponent } from './pages/etapa/etapa.component';
import { AdminetapaComponent } from './pages/adminetapa/adminetapa.component';
import { MarketComponent } from './pages/market/market.component';
import { PublicidadComponent } from './pages/publicidad/publicidad.component';
import { UrbanizacionComponent } from './pages/urbanizacion/urbanizacion.component';
import { BitacoraComponent } from './pages/bitacora/bitacora.component';
import { ListabitacoraComponent } from './pages/listabitacora/listabitacora.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MultiFilterPipe } from './pipes/multifilter.pipe';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { TransaccionComponent } from './pages/transaccion/transaccion.component';
import { ListaetapaComponent } from './pages/listaetapa/listaetapa.component';
import { ModulosComponent } from './pages/modulos/modulos.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopbarComponent,
    LeftSidebarComponent,
    HomeComponent,
    FooterComponent,
    BreadcrumbComponent,
    AdministradorComponent,
    UrbanizacionComponent,
    EtapaComponent,
    AdminetapaComponent,
    MarketComponent,
    PublicidadComponent,
    FilterPipe,
    MultiFilterPipe,
    BitacoraComponent,
    ListabitacoraComponent,
    TransaccionComponent,
    ListaetapaComponent,
    ModulosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgPipesModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    MomentModule,
    NgxChartsModule,
    ColorPickerModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
