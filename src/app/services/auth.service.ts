import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
import { environment } from "./../../environments/environment";
import { UsuarioModelo } from "../models/usuario.model";
import { AngularWaitBarrier } from "blocking-proxy/built/lib/angular_wait_barrier";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loading = false;
  master: UsuarioModelo;
  private apikey = "";
  userToken: string;
  info: any;
  infoGuard: any;
  constructor(private http: HttpClient) {
    this.leerToken();
    moment.locale("es");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("info");
  }

  login(body) {
    return this.http
      .post(`https://api.practical.com.ec/auth/admin-master`, body)
      .pipe(
        map((resp: any) => {
          this.guardarToken(resp.respuesta);
          console.log(resp.respuesta.token);
          return resp;
        })
      );
  }

  private guardarToken(idToken: any) {
    this.userToken = idToken.token;
    console.log(this.userToken);
    this.info = JSON.stringify(idToken);
    this.infoGuard = 1;
    localStorage.setItem("token", idToken.token);
    localStorage.setItem("info", JSON.stringify(idToken.usuario));
  }

  leerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
      this.info = JSON.parse(localStorage.getItem("info"));
      this.infoGuard = 1;
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  // ADMINISTRADOR
  getAdmin() {
    console.log("hola");
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return this.http.get(`${environment.apiUrl}/master`, { headers }).pipe(
      map((resp: any) => {
        console.log(resp.respuesta);
        return resp.respuesta;
      })
    );
  }

  createAdmin(data) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .post(`${environment.apiUrl}/master`, data, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  editAdmin(id: number, data: any) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    console.log("editar id usuario servicio: ", id);
    console.log("informacion a editar: ", data);
    return new Promise((resolve) => {
      this.http.put(`${environment.apiUrl}/master/${id}`, data, {headers}).subscribe((response: any) => {
        this.showAlert(response.message, 'success', 'Listo');
        resolve(true);
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        this.showAlert(error.error.message, 'error');
        resolve(false);
      });
    });
  }

  deleteAdmin(id: number) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .delete(`${environment.apiUrl}/master/${id}`, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  // URBANIZACION
  getUrb() {
    console.log("hola");
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return this.http
      .get(`${environment.apiUrl}/urbanizacion`, { headers })
      .pipe(
        map((resp: any) => {
          console.log(resp.respuesta);
          return resp.respuesta;
        })
      );
  }

  createUrb(data) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .post(`${environment.apiUrl}/urbanizacion`, data, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  editUrb(id: number, data: any) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .put(`${environment.apiUrl}/urbanizacion/${id}`, data, { headers })
        .subscribe(
          (response: any) => {
            // this.showAlert(response.message, 'success', 'Listo');
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  deleteUrb(id: number) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .delete(`${environment.apiUrl}/urbanizacion/${id}`, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  // ETAPAS
  getEtapa() {
    console.log("hola");
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return this.http.get(`${environment.apiUrl}/etapa`, { headers }).pipe(
      map((resp: any) => {
        console.log(resp.respuesta);
        return resp.respuesta;
      })
    );
  }

  createEtapa(data) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .post(`${environment.apiUrl}/etapa`, data, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  editEtapa(id: number, data: any) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .put(`${environment.apiUrl}/etapa/${id}`, data, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  deleteEtapa(id: number) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .delete(`${environment.apiUrl}/etapa/${id}`, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  // MARKET
  getMarket() {
    console.log("hola");
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return this.http.get(`${environment.apiUrl}/categoria`, { headers }).pipe(
      map((resp: any) => {
        console.log(resp.respuesta);
        return resp.respuesta;
      })
    );
  }

  createMarket(data) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .post(`${environment.apiUrl}/categoria`, data, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  editMarket(id: number, data: any) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .put(`${environment.apiUrl}/categoria/${id}`, data, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  deleteMarket(id: number) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .delete(`${environment.apiUrl}/categoria/${id}`, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  // ADMINISTRADOR ETAPA
  getAdminEtapa() {
    console.log("hola");
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return this.http.get(`${environment.apiUrl}/admin-etapa`, { headers }).pipe(
      map((resp: any) => {
        console.log(resp.respuesta);
        return resp.respuesta;
      })
    );
  }

  createAdminEtapa(data) {
    console.log(data);
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .post(`${environment.apiUrl}/admin-etapa`, data, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  editAdminEtapa(id: number, data: any) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .put(`${environment.apiUrl}/admin-etapa/${id}`, data, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
            console.log("entro editar");
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  deleteAdminEtapa(id: number) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .delete(`${environment.apiUrl}/admin-etapa/${id}`, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  // ADMINISTRADOR ETAPA
  getPublicidad() {
    console.log("hola");
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return this.http
      .get(`${environment.apiUrl}/publicidades`, { headers })
      .pipe(
        map((resp: any) => {
          console.log(resp.respuesta);
          return resp.respuesta;
        })
      );
  }

  createPublicidad(data) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .post(`${environment.apiUrl}/publicidades`, data, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  editPublicidad(id: number, data: any) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .put(`${environment.apiUrl}/publicidades/${id}`, data, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  deletePublicidad(id: number) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .delete(`${environment.apiUrl}/publicidades/${id}`, { headers })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }

  // BITACORA
  getBitacoraById(id: number) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return this.http
      .get(`${environment.apiUrl}/bitacoras/etapa/${id}`, { headers })
      .pipe(
        map((resp: any) => {
          console.log(resp.respuesta);
          return resp.respuesta;
        })
      );
  }

  // BITACORA
  getEtapaById(id: number) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return this.http.get(`${environment.apiUrl}/etapa/${id}`, { headers }).pipe(
      map((resp: any) => {
        console.log(resp.respuesta);
        return resp.respuesta;
      })
    );
  }

  // TRANSACCION
  getTransaccion() {
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return this.http
      .get(`${environment.apiUrl}/transacciones`, { headers })
      .pipe(
        map((resp: any) => {
          console.log(resp.respuesta);
          return resp.respuesta;
        })
      );
  }

  sendTransaccion(id: number) {
    this.loading = true;
    const headers = new HttpHeaders({
      token: this.userToken,
    });
    return new Promise((resolve) => {
      this.http
        .post(`${environment.apiUrl}/transacciones/${id}/devolver`, null, {
          headers,
        })
        .subscribe(
          (response: any) => {
            this.showAlert(response.message, "success", "Listo");
            resolve(true);
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.showAlert(error.error.message, "error");
            resolve(false);
          }
        );
    });
  }
  // RECUPERAR CONTRASEÑA

  enviarCodigo(data: string) {
    this.loading = true;
    return new Promise((resolve) => {
      this.http
        .put(`${environment.apiUrl}/recuperar/contrasena`, data)
        .subscribe(
          (response: any) => {
            this.loading = false;
            this.showAlert(
              "Si el correo existe enviaremos una código a su cuenta",
              "success",
              "Listo"
            );
            resolve(true);
          },
          (error: any) => {
            this.loading = false;
            if (this.tokenIsValid(error.status)) {
              this.showAlert(
                "Si el correo existe enviaremos una código a su cuenta",
                "success",
                "Listo"
              );
            }
            resolve(false);
          }
        );
    });
  }

  recover(data: string) {
    this.loading = true;
    return new Promise((resolve) => {
      this.http
        .put(`${environment.apiUrl}/recuperar/contrasena/update`, data)
        .subscribe(
          (response: any) => {
            this.loading = false;
            this.showAlert(
              "Se cambio con éxito su contraseña",
              "success",
              "Listo"
            );
            resolve(true);
          },
          (error: any) => {
            this.loading = false;
            if (this.tokenIsValid(error.status)) {
              this.showAlert(error.error.respuesta, "error");
            }
            resolve(false);
          }
        );
    });
  }

  showAlert(
    message: string,
    tipo: any,
    confirmBtnText: string = "Intentar nuevamente"
  ) {
    Swal.fire({
      title: "P&S",
      text: message,
      icon: tipo,
      confirmButtonText: confirmBtnText,
    });
  }

  tokenIsValid(status: number) {
    if (status === 405) {
      this.logout();
      return false;
    }
    return true;
  }
}
