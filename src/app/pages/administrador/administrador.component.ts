import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioModelo } from "src/app/models/usuario.model";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

@Component({
  selector: "app-administrador",
  templateUrl: "./administrador.component.html",
  styleUrls: ["./administrador.component.css"],
})
export class AdministradorComponent implements OnInit {
  admins: UsuarioModelo[] = [];
  id_usuario: 0;
  correo: "";
  nombres: "";
  apellidos: "";
  edit: false;
  contrasena: "";
  usuario: "";
  telefono: "";
  accesos: "";
  id: 0;
  imagen = null;
  changeFoto = false;
  cedula: "";

  searchText = "";
  admin = {
    id_usuario: 0,
    correo: "",
    nombres: "",
    apellidos: "",
    edit: false,
    contrasena: "",
    usuario: "",
    telefono: "",
    imagen: null,
  };
  acceso = {
    accesos: "",
    id_usuario: "",
  };

  menu = ["Administradores"];
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAdmin();
  }

  preview(event: any) {
    console.log("entró preview:");
    const fileData = event.target.files[0];
    const mimeType = fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (response) => {
      this.imagen = reader.result;
    };
    this.changeFoto = true;
  }


  openAcceso(content, acceso) {
    this.acceso.id_usuario = acceso.id_usuario;
    this.modalService.open(content);
  }

  openAdmin(content, admin = null) {
    if (admin) {
      this.id_usuario = admin.usuario.id_usuario;
      this.id = admin.ID;
      this.correo = admin.usuario.correo;
      this.contrasena = admin.clave;
      this.nombres = admin.usuario.nombres;
      // this.apellidos = admin.usuario.apellidos;
      // this.cedula = admin.usuario.cedula;
      this.admin.edit = true;
      this.usuario = admin.usuario.usuario;
      this.telefono = admin.usuario.telefono;
      this.contrasena = admin.usuario.contrasena;
      this.imagen = null
      console.log("admin: ", admin);
    } else {
      this.id_usuario = 0;
      this.correo = "";
      this.nombres = "";
      // apellidos: ='',
      // this.cedula = "";
      this.contrasena = "";
      this.admin.edit = false;
      this.telefono = "";
      this.usuario = "";
      this.imagen = this.imagen;
    }
    this.modalService.open(content);
  }
  getAdmin() {
    this.auth.getAdmin().subscribe((resp: any) => {
      console.log(resp);
      this.admins = resp;
      console.log("autorizados: ", this.admins)
    });
  }

  async gestionAdmin() {
    let response: any;
    if (this.admin.edit) {
      const body = {
        usuario: {
          nombres: this.nombres,
          apellidos: this.apellidos,
          correo: this.correo,
          telefono: this.telefono,
          usuario: this.usuario,
          contrasena: this.contrasena,
          imagen: this.imagen,
          cedula: this.cedula,
        },
      };
      console.log("body edit:", body);
      JSON.stringify(body);
      // response = await this.auth.editAdmin(this.id, body);
    } else {
      const body = {
        usuario: {
          nombres: this.nombres,
          apellidos: this.apellidos,
          correo: this.correo,
          telefono: this.telefono,
          usuario: this.usuario,
          contrasena: this.contrasena,
          imagen: this.imagen,
          cedula: this.cedula
        },
      };
      JSON.stringify(body);
      console.log("usuario crear: ", body);
      // response = await this.auth.createAdmin(body);
    }
    if (response) {
      this.modalService.dismissAll();
      this.getAdmin();
    }
  }

  delete(id: number) {
    Swal.fire({
      title: "¿Seguro que desea eliminar este registro?",
      text: "Esta acción no se puede reversar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#343A40",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.deleteAdmin(id);
      }
    });
  }

  async deleteAdmin(id: number) {
    const response = await this.auth.deleteAdmin(id);
    if (response) {
      this.getAdmin();
    }
  }
}
