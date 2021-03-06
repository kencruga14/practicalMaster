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
  permisos: any = {}
  infoPermisos: any = {}
  admins: UsuarioModelo[] = [];
  prueba: any;
  id_usuario: 0;
  nombre: any;
  correo: "";
  cedula: "";
  nombres: "";
  apellidos: "";
  edit: false;
  contrasena: "";
  usuario: "";
  telefono: "";
  accesos: "";
  imagenPerfila: any;
  id: any;
  imagen = null;
  imagenEdit = null;
  changeFoto = false;
  imagenPerfil: any;
  searchText = "";
  apellido: any;
  admin = {
    // id_usuario: null,
    correo: "",
    nombres: "",
    apellidos: "",
    cedula: "",
    edit: false,
    contrasena: "",
    usuario: "",
    telefono: 0,
    imagen: null,
    apellido: "",
    permisos: {}
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
  ) { }

  ngOnInit() {
    this.getAdmin();

  }

  saveEditPicture(event: any) {
    // console.log("entró preview:");
    const fileData = event.target.files[0];
    const mimeType = fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (response) => {
      this.imagenEdit = reader.result;
    };
    this.changeFoto = true;
  }

  preview(event: any) {
    // console.log("entró preview:");
    const fileData = event.target.files[0];
    const mimeType = fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (response) => {
      this.imagen = reader.result;
      this.imagenPerfila = reader.result
    };
    // console.log("imagen: ", this.imagen);
    this.changeFoto = true;
  }
  //Abre modales
  openAcceso(content, acceso) {
    this.modalService.open(content);
  }
  //Abre Modal Imagen
  openImage(content, admin) {
    this.imagenPerfil = admin;
    this.modalService.open(content);
  }

  //setea valores al modelo
  openAdmin(content, admin = null) {
    // console.log("edit valor: ", admin);
    if (admin) {
      // this.id_usuario = admin.id_usuario;
      this.id = admin.ID;
      this.nombres = admin.usuario.nombres;
      this.apellido = admin.usuario.apellido;
      this.usuario = admin.usuario.usuario;
      this.telefono = admin.usuario.telefono;
      this.cedula = admin.usuario.cedula;
      this.correo = admin.usuario.correo;
      this.imagenEdit = admin.usuario.imagen;
      this.admin.edit = true;
      this.permisos = admin.permisos


      // console.log("admin editar cuerpo:", admin);
    } else {
      //Inicializa variables
      this.imagenPerfil=""
      this.imagenEdit=false
      this.nombres = "";
      this.apellido = "";
      this.usuario = "";
      this.telefono = "";
      this.cedula = "";
      this.contrasena = "";
      this.correo = "";
      this.admin.edit = false;
      this.imagen = this.imagen;
      this.permisos = {}
    }
    this.modalService.open(content);
  }
  //Servicio que trae la información de los usuarios
  getAdmin() {
    this.auth.getAdmin().subscribe((resp: any) => {
      this.admins = resp;
      console.log(resp)
    });
  }

  //Servicio Post y Put
  async gestionAdmin() {
    let response: any;
    if (this.admin.edit) {
      delete this.permisos.CreatedAt
      delete this.permisos.DeletedAt
      delete this.permisos.ID
      delete this.permisos.UpdatedAt
      delete this.permisos.admin_master
      this.admin.permisos = this.permisos
      const body = {
        usuario: {
          // ID: this.id,
          nombres: this.nombres,
          apellido: this.apellido,
          correo: this.correo,
          telefono: this.telefono,
          usuario: this.usuario,
          contrasena: this.contrasena,
          cedula: this.cedula,
          imagen: this.imagenEdit,
        },
        permisos: this.admin.permisos
      };
      // console.log("body edit:", body);
      // console.log("id del Usuario a editar: ", this.id);
      JSON.stringify(body);
      response = await this.auth.editAdmin(this.id, body);
    } else {
      delete this.permisos.CreatedAt
      delete this.permisos.DeletedAt
      delete this.permisos.ID
      delete this.permisos.UpdatedAt
      delete this.permisos.admin_master
      this.admin.permisos = this.permisos
      const body = {
        usuario: {
          nombres: this.nombres,
          apellido: this.apellido,
          correo: this.correo,
          telefono: this.telefono,
          usuario: this.usuario,
          cedula: this.cedula,
          imagen: this.imagen,
        },
        permisos: this.admin.permisos
      };
      JSON.stringify(body);
      // console.log("usuario crear: ", body);

      response = await this.auth.createAdmin(body);
    }
    if (response) {
      this.modalService.dismissAll();
      this.admin = {
        correo: "",
        nombres: "",
        apellidos: "",
        cedula: "",
        edit: false,
        contrasena: "",
        usuario: "",
        telefono: 0,
        imagen: null,
        apellido: "",
        permisos: {}
      };
      this.imagen = null;
      this.imagenPerfil = null;
      this.imagenPerfila = null;
      this.imagenEdit = null;
      this.getAdmin();
    }
    this.imagen = null;
    this.imagenPerfil = null;
    this.imagenPerfila = null;
    this.imagenEdit = null;
  }

  //Servicio sweatAlert
  delete(id: number) {
    Swal.fire({
      title: "¿Seguro que desea eliminar este registro?",
      
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

  //Servicio que elimina
  async deleteAdmin(id: number) {
    const response = await this.auth.deleteAdmin(id);
    if (response) {
      this.getAdmin();
    }
  }
  mostrarPermisos(content, admin) {
    delete this.permisos.CreatedAt
    this.infoPermisos = admin.permisos

    for (const property in this.infoPermisos) {
      console.log(`${property}: ${this.infoPermisos[property]}`);
    }
    this.modalService.open(content);

  }
}
