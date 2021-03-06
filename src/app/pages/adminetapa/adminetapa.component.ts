import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioModelo } from "src/app/models/usuario.model";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

@Component({
  selector: "app-adminetapa",
  templateUrl: "./adminetapa.component.html",
  styleUrls: ["./adminetapa.component.css"],
})
export class AdminetapaComponent implements OnInit {
  imagenEdit :any;
  title = "testJobNestedArray";
  searchableList: any;
  searchText: string = "";
  users: any;
  imagenAlt: any;
  id_seleccionado: any;
  nombre_etapa: any;
  etapasid: any;
  urbs: UsuarioModelo[] = [];
  idUrbanizacion: any;
  etapas: UsuarioModelo[] = [];
  admins: UsuarioModelo[] = [];
  id_adminetapa: 0;
  id_etapa: 0;
  id_urbanizacionseleccionada: any;
  correo: "";
  nombres: "";
  edit: false;
  contrasena: "";
  usuario: "";
  telefono: "";
  celular: "";
  cedula: "";
  accesos: "";
  apellido: any;
  imagenPerfila: any;
  imagenPerfil: any;
  nombre_banco: any;
  tipo_cuenta: any;
  pagos_tarjeta: any;
  numero_cuenta: any;
  modulo_alicuota: any;
  imagen = null;
  id_etapaEspecif: any;
  id: 0;
  changeFoto = false;
  modulo_camaras: any;
  modulo_directiva: any;
  modulo_galeria: any;
  modulo_horarios: any;
  modulo_mi_registro: any;
  modulo_emprendimiento: any;
  modulo_votacion: any;
  modulo_area_social: any;
  filterName = "";
  admin : any = {
    id_adminetapa: 0,
    id_etapa: 0,
    cedula: "",
    correo: "",
    celular: "",
    nombres: "",
    edit: false,
    contrasena: "",
    usuario: "",
    telefono: "",
    imagen: null,
  };
  acceso = {
    accesos: "",
    id_adminetapa: "",
  };

  menu = ["Administradores de Etapa"];
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAdminEtapa();
    this.getUrbanizaciones();
  }

  openAcceso(content, acceso) {
    this.acceso.id_adminetapa = acceso.id_adminetapa;
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
      this.imagenPerfil = reader.result
    };
    this.changeFoto = true;
  }

  openAdminEtapa(content, admin = null) {
    if (admin) {
      this.id_adminetapa = admin.usuario.id_adminetapa;
      this.idUrbanizacion = admin.etapa.id_urbanizacion;
      this.id = admin.ID;
      this.correo = admin.etapa.correo;
      this.contrasena = admin.clave;
      this.nombres = admin.usuario.nombres;
      this.apellido = admin.usuario.apellido;
      this.admin.edit = true;
      this.usuario = admin.usuario.usuario;
      this.telefono = admin.usuario.telefono;
      this.contrasena = admin.usuario.contrasena;
      this.celular = admin.usuario.celular;
      this.cedula = admin.cedula;
      this.id_etapa = admin.id_etapa;
      // this.imagenPerfila = admin.usuario.imagen;
      this.imagenEdit =  admin.usuario.imagen;
      this.imagen =  admin.usuario.imagen;
    } else {
      this.admin.edit = false
      this.idUrbanizacion =""
      this.id_etapa = 0;
      this.id_adminetapa = 0;
      this.imagenPerfil =""
      this.imagenEdit=""
      this.nombres = "";
      this.apellido = "";
      this.usuario = "";
      this.admin.urbanizacion ="";
      this.cedula = "";
      this.correo = "";
      this.telefono = "";
      this.imagen = null;
    }
    this.modalService.open(content);
  }
  getAdminEtapa() {
    this.auth.getAdminEtapa().subscribe((resp: any) => {
      this.admins = resp;
      // console.log("admin etapas: ", this.admins);
    });
  }

  openImage(content, admin) {
    this.imagenPerfil = admin;
    this.modalService.open(content);
  }

  async gestionAdminEtapa() {
    let response: any;
    if (this.admin.edit) {
      const body = {
        cedula: this.cedula,
        id_etapa: this.id_etapa,
        usuario: {
          nombres: this.nombres,
          apellido: this.apellido,
          usuario: this.usuario,
          correo: this.correo,
          telefono: this.telefono,
          imagen: this.imagenAlt,
        },
      };
      JSON.stringify(body);
      response = await this.auth.editAdminEtapa(this.id, body);
    } else {
      const body = {
        etapa: this.nombre_etapa,
        id_etapa: this.id_etapa,
        cedula: this.cedula,
        usuario: {
          nombres: this.nombres,
          apellido: this.apellido,
          usuario: this.usuario,
          correo: this.correo,
          telefono: this.telefono,
          imagen: this.imagenPerfil
        },
      };
      JSON.stringify(body);
      response = await this.auth.createAdminEtapa(body);
    }
    if (response) {
      this.modalService.dismissAll();
      this.getAdminEtapa();
    }
  }

  getUrbId(id) {
    // console.log("id: ", id);
    this.auth.getEtapaByIdUrbanizacion(id).subscribe((resp: any) => {
      this.etapasid = resp;
      // console.log("etapas por id: ", this.etapasid);
    });
  }

  getUrbEspecf(value) {
    this.id_etapa = value;
    this.getNombreEtapa(value);
  }

  getNombreEtapa(id) {
    this.auth.EtapaById(id).subscribe((resp: any) => {
      this.nombre_etapa = resp.nombre;
      // console.log("this.nombre_etapa: ", this.nombre_etapa);
    });
  }

  getUrbanizaciones() {
    this.auth.getUrb().subscribe((resp: any) => {
      this.urbs = resp;
      // console.log("urbanizaciones: ", this.urbs);
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "??Seguro que desea eliminar este registro?",

      showCancelButton: true,
      confirmButtonColor: "#343A40",
      cancelButtonColor: "#d33",
      confirmButtonText: "S??",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.deleteAdminEtapa(id);
      }
    });
  }

  async deleteAdminEtapa(id: number) {
    const response = await this.auth.deleteAdminEtapa(id);
    if (response) {
      this.getAdminEtapa();
    }
  }

  editImagen(event: any) {
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

  
  saveEditPicture(event: any) {
    console.log("entr?? preview:");
    const fileData = event.target.files[0];
    const mimeType = fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (response) => {
      this.imagenEdit = reader.result;
      this.imagenAlt = reader.result;
    };
    this.changeFoto = true;
  }

}
