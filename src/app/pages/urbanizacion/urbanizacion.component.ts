import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioModelo } from "src/app/models/usuario.model";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
@Component({
  selector: "app-urbanizacion",
  templateUrl: "./urbanizacion.component.html",
  styleUrls: ["./urbanizacion.component.css"],
})
export class UrbanizacionComponent implements OnInit {
  urbs: UsuarioModelo[] = [];
  id_urb: 0;
  correo: "";
  nombre: "";
  edit: false;
  ciudad: "";
  telefono: "";
  direccion: "";
  nombre_banco: "";
  imagen = null;
  tipo_cuenta: any;
  numero_cuenta: any;
  id: 0;
  changeFoto = false;

  filterName = "";
  urb = {
    id_usuario: 0,
    correo: "",
    ciudad: "",
    nombres: "",
    edit: false,
    contrasena: "",
    usuario: "",
    telefono: "",
    imagen: null,
  };
  acceso = {
    accesos: "",
    id_urb: "",
  };

  menu = ["Urbanizaciones h"];
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUrb();
  }
  openAcceso(content, acceso) {
    this.acceso.id_urb = acceso.id_urb;
    this.modalService.open(content);
  }
  preview(event: any) {
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

  openUrb(content, urb = null) {
    if (urb) {
      this.id_urb = urb.ID;
      this.id = urb.ID;
      this.correo = urb.correo;
      this.nombre = urb.nombre;
      this.urb.edit = true;
      this.imagen = null;
      this.ciudad = urb.ciudad;
      this.telefono = urb.telefono;
      this.direccion = urb.direccion;
    } else {
      this.id_urb = 0;
      this.correo = "";
      this.nombre = "";
      this.urb.edit = false;
      this.telefono = "";
      this.ciudad = "";
      this.imagen = null;
      this.direccion = "";
    }
    this.modalService.open(content);
  }
  getUrb() {
    this.auth.getUrb().subscribe((resp: any) => {
      // console.log(resp);
      this.urbs = resp;
      // console.log("urbanizaciones: ", this.urbs);
    });
  }

  async gestionUrb() {
    let response: any;
    if (this.urb.edit) {
      const body = {
        nombre: this.nombre,
        correo: this.correo,
        ciudad: this.ciudad,
        telefono: this.telefono,
        imagen: this.imagen,
        direccion: this.direccion,
      };
      JSON.stringify(body);
      console.log("datos urb editar: ", body);
      response = await this.auth.editUrb(this.id, body);
    } else {
      const body = {
        urbanizacion: null,
        nombre: this.nombre,
        correo: this.correo,
        telefono: this.telefono,
        nombre_banco: this.nombre_banco,
        tipo_cuenta: this.tipo_cuenta,
        numero_cuenta: this.numero_cuenta,

        ciudad: this.ciudad,
        imagen: this.imagen,
        direccion: this.direccion,
      };
      JSON.stringify(body);
      console.log("datos urb crear: ", body);

      response = await this.auth.createUrb(body);
    }
    if (response) {
      this.modalService.dismissAll();
      this.getUrb();
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
        this.deleteUrb(id);
      }
    });
  }

  async deleteUrb(id: number) {
    const response = await this.auth.deleteUrb(id);
    if (response) {
      this.getUrb();
    }
  }
}
