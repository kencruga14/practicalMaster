import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioModelo } from "src/app/models/usuario.model";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
@Component({
  selector: "app-modulos",
  templateUrl: "./modulos.component.html",
  styleUrls: ["./modulos.component.css"],
})
export class ModulosComponent implements OnInit {
  publicidades: UsuarioModelo[] = [];
  urbanizaciones: UsuarioModelo[] = [];
  idUrbanizacion: any;
  idEtapa: "";
  id_etapa: any;
  etapasid: any;
  id_publicidad: 0;
  nombre: any;
  prioridad: 0;
  imagenseleccionada: any;
  estadoseleccionado: any;
  nombreseleccionado: any;
  etapaseleccionada: any;
  edit: false;
  imagen = null;
  id: 0;
  changeFoto = false;
  etapas: UsuarioModelo[] = [];
  miregistro: boolean;
  alicuotas: boolean;
  emprendimientos: boolean;
  votacion: boolean;
  areasocial: boolean;
  camaras: boolean;
  directiva: boolean;
  galeria: boolean;
  horarios: boolean;
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

  menu = ["Publicidad"];
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUrb();
  }

  getUrb() {
    this.auth.getUrb().subscribe((resp: any) => {
      this.urbanizaciones = resp;
    });
  }

  getUrbId(id) {
    this.id_etapa=""
    this.auth.getEtapaByIdUrbanizacion(id).subscribe((resp: any) => {
      this.etapasid = resp;
    });
  }

  getEtapaSeleccionada(value) {
    console.log("etapa selecionada: ", value);
    this.auth.getEtapaSelect(value).subscribe((resp: any) => {
      this.etapaseleccionada = resp;
      this.id = resp.ID;
      console.log("etapa sellecionada datos: ", this.etapaseleccionada);
      this.miregistro = resp.modulo_mi_registro;
      this.alicuotas = resp.modulo_alicuota;
      this.emprendimientos = resp.modulo_emprendimiento;
      this.votacion = resp.modulo_votacion;
      this.areasocial = resp.modulo_area_social;
      this.camaras = resp.modulo_camaras;
      this.directiva = resp.modulo_directiva;
      this.galeria = resp.modulo_galeria;
      this.horarios = resp.modulo_horarios;
      console.log("miregistro: ", this.miregistro);
      console.log("alicuotas: ", this.alicuotas);
      console.log("emprendimientos: ", this.emprendimientos);
      console.log("votacion: ", this.votacion);
      console.log("areasocial: ", this.areasocial);
      console.log("camaras: ", this.camaras);
      console.log("directiva: ", this.directiva);
      console.log("galeria: ", this.galeria);
      console.log("horarios: ", this.horarios);
    });
  }

  openModulo(imagen, estado, nombre, content) {
    // console.log("Estado: ", estado), console.log("Imagen: ", imagen);
    // console.log("content: ", content);
    // console.log("nombre: ", nombre);
    this.estadoseleccionado = estado;
    this.imagenseleccionada = imagen;
    this.nombreseleccionado = nombre;
    this.modalService.open(content);
  }

  openAcceso(content, acceso) {
    this.acceso.id_publicidad = acceso.id_publicidad;
    this.modalService.open(content);
  }

  async update(value, nombre) {
    let response: any;
    let valor = JSON.parse(value);
    console.log("nombre: ", nombre);
    console.log("valor: ", valor);
    console.log("Id_etapa: ", this.id);
    let campo = "";
    if (nombre === "Mi Registro") {
      this.miregistro = valor;
    } else if (nombre === "Alicuotas") {
      this.alicuotas = valor;
    } else if (nombre === "Emprendimiento") {
      this.emprendimientos = valor;
    } else if (nombre === "Mi voto") {
      this.votacion = valor;
    } else if (nombre === "Area Social") {
      console.log("entro area asocial");
      this.areasocial = valor;
    } else if (nombre === "Camaras") {
      console.log("entro Cámaras");
      this.camaras = valor;
    } else if (nombre === "Directiva") {
      console.log("entro Directiva");

      this.directiva = valor;
    } else if (nombre === "Galeria") {
      console.log("entro Galería");
      this.galeria = valor;
    } else if (nombre === "Horarios") {
      console.log("entro Horarios");
      this.horarios = valor;
    }
    let body = {
      modulo_votacion: this.votacion,
      modulo_area_social: this.areasocial,
      modulo_alicuota: this.alicuotas,
      modulo_emprendimiento: this.emprendimientos,
      modulo_camaras: this.camaras,
      modulo_directiva: this.directiva,
      modulo_galeria: this.galeria,
      modulo_horarios: this.horarios,
      modulo_mi_registro: this.miregistro,
    };
    console.log("body editar modulo: ", body);
    response = await this.auth.editEtapa(this.id, body);
    if (response) {
      this.modalService.dismissAll();
      this.getEtapaSeleccionada(this.id_etapa)
      // this.imagenseleccionada = null;
      // this.estadoseleccionado = null;
      // this.nombreseleccionado = null;
      // this.etapaseleccionada = null;
      // this.idUrbanizacion = null;
      // this.id_etapa = null;
      // valor = null;
    }
  }
}
