import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { AdministradorComponent } from "./pages/administrador/administrador.component";
import { UrbanizacionComponent } from "./pages/urbanizacion/urbanizacion.component";
import { EtapaComponent } from "./pages/etapa/etapa.component";
import { MarketComponent } from "./pages/market/market.component";
import { PublicidadComponent } from "./pages/publicidad/publicidad.component";
import { AuthGuard } from "./guards/auth.guard";
import { RolGuard } from "./guards/rol.guard";
import { AdminetapaComponent } from "./pages/adminetapa/adminetapa.component";
import { BitacoraComponent } from "./pages/bitacora/bitacora.component";
import { TransaccionComponent } from "./pages/transaccion/transaccion.component";
import { ListabitacoraComponent } from "./pages/listabitacora/listabitacora.component";
import { ListaetapaComponent } from "./pages/listaetapa/listaetapa.component";
import { ModulosComponent } from "./pages/modulos/modulos.component";
import { CambiarcontrasenaComponent } from "./pages/cambiarcontrasena/cambiarcontrasena.component";
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";
import { ResidenteComponent } from "./pages/residente/residente.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { HomeGuard } from "./guards/home.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [HomeGuard] },
  { path: "cambiarcontrasena/:usuario", component: CambiarcontrasenaComponent },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "inicio",
        component: InicioComponent,
        canActivate: [RolGuard],
      },
      {
        path: "administrador",
        component: AdministradorComponent,
        canActivate: [RolGuard],
      },
      {
        path: "urbanizacion",
        component: UrbanizacionComponent,
        canActivate: [RolGuard],
      },
      { path: "etapa", component: EtapaComponent, canActivate: [RolGuard] },
      {
        path: "adminetapa",
        component: AdminetapaComponent,
        canActivate: [RolGuard],
      },
      { path: "market", component: MarketComponent, canActivate: [RolGuard] },
      {
        path: "publicidad",
        component: PublicidadComponent,
        canActivate: [RolGuard],
      },
      { path: "modulos", component: ModulosComponent, canActivate: [RolGuard] },
      { path: "bitacora", component: BitacoraComponent },
      { path: "listabitacora/:id/:name", component: ListabitacoraComponent },
      { path: "listaetapa/:id/:name", component: ListaetapaComponent },
      { path: "transaccion", component: TransaccionComponent },
      { path: "usuarios", component: UsuariosComponent },
      { path: "residente", component: ResidenteComponent },
      { path: "**", redirectTo: "inicio" },
    ],
  },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
