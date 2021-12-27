import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioModelo } from "src/app/models/usuario.model";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import * as moment from "moment";
@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {
  valorTotal : any = 0 ;
  publicidades: UsuarioModelo[] = [];
  imagenPerfil: any;
  tablaEtapa: any = []
  urbanizaciones: UsuarioModelo[] = [];
  idUrbanizacion: any;
  idEtapa: "";
  id_etapa: any;
  etapasid: any;
  id_publicidad: 0;
  nombre: any;
  prioridad: 0;
  edit: false;
  imagen = null;
  id: 0;
  changeFoto = false;
  etapas: UsuarioModelo[] = [];
  filterName = "";
  publicidad = {
    id_publicidad: 0,
    prioridad: "",
    edit: false,
    imagen: null,
  };
  acceso = {
    accesos: "",
    id_publicidad: "",
  };


  residentes: any;
  casas: UsuarioModelo[] = [];
  id_residente: 0;
  id_casa: 0;
  nombres: "";
  manzanaselector: [];
  casasselector: any;
  telefono: "";
  documento: any;
  fechanacimiento: any;
  imagenPerfila: any;
  correo: "";
  celular: "";
  usuario: "";
  cedula: "";
  apellido: "";
  contrasena: "";
  imagenEdit = null;
  es: any;
  is_principal: Boolean;
  eta = [];
  autorizacion: Boolean;
  manzana: any;
  id_villa: any;
  votacion: boolean;
  fechaMaxima = new Date();
  autorizacionTemp: boolean;
  autorizacionFija: boolean;
  id_urbanizacion: any;
  accion: Boolean;
  pdfEdit = null;
  villa: number = 0;
  residente = {
    id_casa: 0,
    celular: "",
    id_residente: 0,
    nombres: "",
    edit: false,
    imagen: null,
    correo: "",
    telefono: "",
    villa: "",
    manzana: "",
    documento: "",
    usuario: "",
    cedula: "",
    fechanacimiento: "",
    contrasena: "",
    apellido: "",
    is_principal: "",
    autorizacion: "",
    accion: "",
  };
  editing = false;





  menu = ["Publicidad"];
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getUrb();
    this.getEtapa();
  }
  getUrb() {
    this.auth.getUrb().subscribe((resp: any) => {
      // console.log(resp);
      this.urbanizaciones = resp;
    });
  }

  getEtapa() {
    this.auth.getEtapa().subscribe((resp: any) => {
      // console.log(resp);
      this.etapas = resp;
      // console.log("etapas");
    });
  }

  getUrbId(id) {
    this.id_etapa=""
    this.valorTotal = 0
    this.auth.getEtapaByIdUrbanizacion(id).subscribe((resp: any) => {
      this.etapasid = resp;
      // console.log("etapas por id: ", this.etapasid);
    });
  }

  openAcceso(content, acceso) {
    this.acceso.id_publicidad = acceso.id_publicidad;
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

  openPublicidad(content, publicidad = null) {
    if (publicidad) {
      this.id_publicidad = publicidad.ID;
      this.id = publicidad.ID;
      this.prioridad = publicidad.nombre;
      this.publicidad.edit = true;
      this.imagen = null;
    } else {
      this.id_publicidad = 0;
      this.prioridad = 0;
      this.publicidad.edit = false;
      this.imagen = null;
    }
    this.modalService.open(content);
  }

  async gestionPublicidad() {
    let response: any;
    if (this.publicidad.edit) {
      const body = {
        prioridad: this.prioridad,
        imagen: this.imagen,
      };

      response = await this.auth.editPublicidad(this.id, body);
    } else {
      const body = {
        prioridad: this.prioridad,
        imagen: this.imagen,
      };

      response = await this.auth.createPublicidad(body);
    }
    if (response) {
      this.modalService.dismissAll();
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
        this.deletePublicidad(id);
      }
    });
  }

  async deletePublicidad(id: number) {
    const response = await this.auth.deletePublicidad(id);
    if (response) {
    }
  }

  getTabla(id: number) {
    this.auth
      .getEtapaByIdUrbanizacionTabla(this.id_etapa)
      .subscribe((resp: any) => {
        this.tablaEtapa = resp;
        this.calcularRecaudaciones();
      });
  }


  //

  openImage(content, admin) {
    this.imagenPerfil = admin;
    this.modalService.open(content);
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }


  openResidente(content, residente = null) {
    if (residente) {
      console.log(residente.fecha_nacimiento.split("T")[0])
      this.id_residente = residente.ID;
      this.id = residente.ID;
      this.celular = residente.usuario.celular;
      this.contrasena = residente.contrasena;
      this.cedula = residente.cedula;
      this.correo = residente.usuario.correo;
      this.nombres = residente.usuario.nombres;
      this.residente.edit = true;
      this.telefono = residente.usuario.telefono;
      this.usuario = residente.usuario.usuario;
      this.fechanacimiento = residente.fecha_nacimiento.split("T")[0];
      this.imagen = null;
      this.id_casa = residente.id_casa;
      this.manzana = residente.casa.manzana;
      this.is_principal = residente.is_principal;
      this.villa = residente.casa.villa;
      this.apellido = residente.usuario.apellido;
      this.imagenEdit = residente.usuario.imagen;
      this.autorizacion = residente.autorizacion;
    } else {
      this.id_residente = 0;
      this.correo = "";
      this.contrasena = "";
      this.cedula = "";
      this.celular = "";
      this.nombres = "";
      this.residente.edit = false;
      this.telefono = "";
      this.is_principal = new Boolean();
      this.autorizacion = new Boolean();
      this.imagen = null;
      this.fechanacimiento = "";
      this.usuario = "";
      this.manzana = "";
      this.villa = 0;
      this.documento = "";
      this.id_casa = 0;
      this.accion = false;
      this.apellido = "";
      this.imagen = this.imagen;
    }
    this.modalService.open(content);
  }


  async gestionResidente() {
    console.log("objeto villa: ", this.villa);
    let response: any;
    if (this.residente.edit) {
      const body = {
        // id_casa: Number(this.villa),
        is_principal: this.is_principal,
        autorizacion: this.autorizacion,
        // cedula: this.cedula,
        fecha_nacimiento: moment(this.fechanacimiento).format(),
        usuario: {
          // apellido: this.apellido,
          celular: this.celular,
          correo: this.correo,
          // nombres: this.nombres,
          telefono: this.telefono,
          // usuario: this.usuario,
          // pdf: this.pdf
          // documeto: this.pdfEdit,
        },
        // documento: this.documento
      };
      console.log("body editar residente: ", body);
      // response = await this.auth.editResidente(this.id, body);
      this.villa = 0
    } else {
      const body = {
        id_casa: this.villa,
        is_principal: this.is_principal,
        autorizacion: this.autorizacion,
        cedula: this.cedula,
        fecha_nacimiento: moment(this.fechanacimiento).format(),
        usuario: {
          apellido: this.apellido,
          celular: this.celular,
          correo: this.correo,
          nombres: this.nombres,
          telefono: this.telefono,
          usuario: this.usuario,
          // pdf: this.pdf
          // documento: this.pdf,
        },
        documento: this.documento

      };
      console.log("body crear residente: ", body);
      // response = await this.auth.createResidente(body);
      this.villa = 0
    }
    if (response) {
      this.modalService.dismissAll();
      this.imagen = null;
      this.imagenPerfila = null;
      this.imagenEdit = null;
      this.id_casa = null;
      this.fechanacimiento = null;
      this.pdfEdit = null;
      this.documento = null;
    }
    this.imagen = null;
    this.imagenPerfila = null;
    this.imagenEdit = null;
    this.id_casa = null;
    this.fechanacimiento = null;
    this.pdfEdit = null;
    this.documento = null;
    this.accion = false;
    this.getResidente();
  }


  getResidente() {
    // this.auth.getResidente().subscribe((resp: any) => {
    //   this.residentes = resp;
    //   console.log("residentes: ", this.residentes);
    // });
  }

  
  getVillas(value) {
    // this.auth.getCasasByManzana(value).subscribe((resp: any) => {
    //   console.log("getCasasByManzana: ", resp);
    //   this.casasselector = resp;
    //   // this.c = _.uniqBy(resp, (obj) => obj.manzana);
    //   // console.log("Manzana selector: ", this.casasselector);
    // });
  }


  
  PDF(event: any) {
    const fileData = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (response) => {
      this.documento = reader.result;
    };
    console.log("pdf base: ", this.documento);
  }

  calcularRecaudaciones() {
    this.valorTotal = 0;
    this.tablaEtapa.forEach((item) => {
      this.valorTotal = this.valorTotal + 1
    });
  }

}
