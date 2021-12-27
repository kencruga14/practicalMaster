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
  pagos_tarjeta : boolean;
  miregistro: boolean;
  formulario_entrada : boolean;
  formulario_salida : boolean;
  autorizacion: boolean;
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
    this.idUrbanizacion=""
    this.id_etapa=""
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
      this.miregistro = resp.modulo_mi_registro;
      this.autorizacion = resp.modulo_autorizacion;
      this.alicuotas = resp.modulo_alicuota;
      this.emprendimientos = resp.modulo_emprendimiento;
      this.votacion = resp.modulo_votacion;
      this.areasocial = resp.modulo_area_social;
      this.camaras = resp.modulo_camaras;
      this.directiva = resp.modulo_directiva;
      this.galeria = resp.modulo_galeria;
      this.horarios = resp.modulo_horarios;
      this.pagos_tarjeta = resp.pagos_tarjeta;
      this.formulario_entrada = resp.formulario_entrada;
      this.formulario_salida = resp.formulario_salida;
      console.log("pagos_tarjeta: ", this.pagos_tarjeta);
      console.log("entrada: ", this.formulario_entrada);
      console.log("salida: ", this.formulario_salida);
 
    });
  }

  openModulo(imagen, estado, nombre, content) {
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
    let campo = "";
    if (nombre === "Mi Registro") {
      this.miregistro = valor;
      this.autorizacion = valor;
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
      modulo_autorizacion : this.autorizacion,
      modulo_votacion: this.votacion,
      modulo_area_social: this.areasocial,
      modulo_alicuota: this.alicuotas,
      modulo_emprendimiento: this.emprendimientos,
      modulo_camaras: this.camaras,
      modulo_directiva: this.directiva,
      modulo_galeria: this.galeria,
      modulo_horarios: this.horarios,
      modulo_mi_registro: this.miregistro,
      pagos_tarjeta : this.pagos_tarjeta,
      formulario_entrada : this.formulario_entrada,
      formulario_salida : this.formulario_salida
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
