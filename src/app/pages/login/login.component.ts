import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioModelo } from "../../models/usuario.model";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: string;
  validacionUsuario: any;
  contrasena: string;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const body = {
      usuario: this.usuario,
      contrasena: this.contrasena,
    };
    JSON.stringify(body);
    Swal.fire({
      icon: "info",
      allowOutsideClick: false,
      text: "Espere por favor",
    });
    Swal.showLoading();

    this.auth.login(body).subscribe(
      (resp) => {
        Swal.close();
        this.router.navigateByUrl("/home");
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error al autenticar",
          text: err.error.message,
        });
      }
    );
  }

  capturarUsuario() {
    // console.log("usuario valor: ", this.usuario);
    if (this.usuario) {
      let usuario = this.usuario;
      let body = {
        usuario: this.usuario,
      };
      this.auth.solicitudPassword(body).subscribe(
        (resp) => {
          this.router.navigate(["/cambiarcontrasena", usuario], {
            skipLocationChange: true,
          });
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.error.respuesta,
          });
        }
      );
    } else {
      Swal.fire("Por favor ingrese su usuario");
    }
  }
}
