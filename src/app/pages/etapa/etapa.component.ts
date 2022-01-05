import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioModelo } from "src/app/models/usuario.model";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: "app-etapa",
  templateUrl: "./etapa.component.html",
  styleUrls: ["./etapa.component.css"],
})
export class EtapaComponent implements OnInit {
  etapas: UsuarioModelo[] = [];
  urbanizaciones: UsuarioModelo[] = [];
  urbanizacionseleccionada: any;
  id_etapa: 0;
  id: 0;
  id_urbanizacion: 0;
  nombres: any;
  edit: false;

  nombre: "";
  correo: "";
  usuario: any;
  telefono: "";
  nombre_banco: "";
  tipo_cuenta: "";
  numero_cuenta: "";
  pagos_tarjeta: boolean;
  modulo_mi_registro: boolean;
  modulo_alicuota: boolean;
  modulo_emprendimiento: boolean;
  modulo_votacion: boolean;
  modulo_area_social: boolean;
  modulo_camaras: boolean;
  modulo_directiva: boolean;
  modulo_galeria: boolean;
  modulo_horarios: boolean;
  formulario_entrada: boolean;
  formulario_salida: boolean;

  filterName = "";
  etapa = {
    id_etapa: 0,
    edit: "",
    nombre: "",
    correo: "",
    usuario: "",
    telefono: "",
    nombre_banco: "",
    tipo_cuenta: "",
    numero_cuenta: "",
    modulo_mi_registro: true,
    modulo_alicuota: true,
    modulo_emprendimiento: true,
    modulo_votacion: true,
    modulo_area_social: true,
    modulo_camaras: true,
    modulo_directiva: true,
    modulo_galeria: true,
    modulo_horarios: true,
    // formulario_entrada: true,
    // formulario_salida: true,
  };
  acceso = {
    accesos: "",
    id_etapa: "",
  };

  menu = ["Etapas"];
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getEtapa();
    this.getUrb();
    const id = Number(this.activatedRoute.snapshot.paramMap.get("ID"));
  }
  getUrb() {
    this.auth.getUrb().subscribe((resp: any) => {
      this.urbanizaciones = resp;
      // console.log("urbanizaciones: ", this.urbanizaciones);
    });
  }

  openAcceso(content, acceso) {
    this.acceso.id_etapa = acceso.id_etapa;
    this.modalService.open(content);
  }

  openInfo(content) {
    this.modalService.open(content);
  }

  openEtapa(content, etapa = null) {
    if (etapa) {
      // console.log("etapa admin: ", etapa);
      this.etapa.edit = "0";
      this.id_urbanizacion = etapa.id_urbanizacion;
      this.id_etapa = etapa.ID;
      this.nombre = etapa.nombre;
      this.correo = etapa.correo;
      this.telefono = etapa.telefono;
      this.nombre_banco = etapa.nombre_banco;
      this.tipo_cuenta = etapa.tipo_cuenta;
      this.numero_cuenta = etapa.numero_cuenta;
      this.pagos_tarjeta = etapa.pagos_tarjeta;
      this.modulo_mi_registro = etapa.modulo_mi_registro;
      this.modulo_alicuota = etapa.modulo_alicuota;
      this.modulo_emprendimiento = etapa.modulo_emprendimiento;
      this.modulo_votacion = etapa.modulo_votacion;
      this.modulo_area_social = etapa.modulo_area_social;
      this.modulo_camaras = etapa.modulo_camaras;
      this.modulo_directiva = etapa.modulo_directiva;
      this.modulo_galeria = etapa.modulo_galeria;
      this.modulo_horarios = etapa.modulo_horarios;
      this.formulario_entrada = etapa.formulario_entrada;
      this.formulario_salida = etapa.formulario_salida;
    } else {
      this.id_urbanizacion = 0;
      this.id_etapa = 0;
      this.nombre = "";
      this.correo = "";
      this.telefono = "";
      this.nombre_banco = "";
      this.tipo_cuenta = "";
      this.numero_cuenta = "";
      // this.pagos_tarjeta = boolean;
      this.modulo_mi_registro = true;
      this.modulo_alicuota = true;
      this.modulo_emprendimiento = true;
      this.modulo_votacion = true;
      this.modulo_area_social = true;
      this.modulo_camaras = true;
      this.modulo_directiva = true;
      this.modulo_galeria = true;
      this.modulo_horarios = true;
      // this.formulario_entrada = true;
      // this.formulario_salida = true;
    }
    this.modalService.open(content);
  }

  getEtapa() {
    this.auth.getEtapa().subscribe((resp: any) => {
      this.etapas = resp;
      // console.log("etapas: ", this.etapas);
    });
  }

  async gestionEtapa() {
    let response: any;

    if (!this.formulario_entrada) {
      // console.log("entro validacion entrada false: ", this.formulario_entrada);
      this.formulario_salida = false;
    }
    // console.log("formulario salida final: ", this.formulario_salida);
    // console.log("formulario_entrada final: ", this.formulario_entrada);
    if (this.etapa.edit === "0") {
      // console.log("entro a etapa edit:");

      const body = {
        id_urbanizacion: this.id_urbanizacion,
        nombre: this.nombre,
        correo: this.correo,
        // usuario: this.usuario,
        telefono: this.telefono,
        nombre_banco: this.nombre_banco,
        tipo_cuenta: this.tipo_cuenta,
        numero_cuenta: this.numero_cuenta,
        pagos_tarjeta: this.pagos_tarjeta,
        modulo_mi_registro: this.modulo_mi_registro,
        modulo_alicuota: this.modulo_alicuota,
        modulo_emprendimiento: this.modulo_emprendimiento,
        modulo_votacion: this.modulo_votacion,
        modulo_area_social: this.modulo_area_social,
        modulo_camaras: this.modulo_camaras,
        modulo_directiva: this.modulo_directiva,
        modulo_galeria: this.modulo_galeria,
        modulo_horarios: this.modulo_horarios,
        formulario_entrada: this.formulario_entrada,
        formulario_salida: this.formulario_salida,
      };
      console.log("modificar camaras: ", body.modulo_camaras);
      console.log("modificar etapa: ", body);
      response = await this.auth.editEtapa(this.id_etapa, body);
    } else {
      const body = {
        id_urbanizacion: this.id_urbanizacion,
        nombre: this.nombre,
        // usuario: this.usuario,
        correo: this.correo,
        telefono: this.telefono,
        nombre_banco: this.nombre_banco,
        tipo_cuenta: this.tipo_cuenta,
        numero_cuenta: this.numero_cuenta,
        pagos_tarjeta: this.pagos_tarjeta,
        modulo_mi_registro: true,
        modulo_alicuota: true,
        modulo_emprendimiento: true,
        modulo_votacion: true,
        modulo_area_social: true,
        modulo_camaras: true,
        modulo_directiva: true,
        modulo_galeria: true,
        modulo_horarios: true,
        formulario_entrada: this.formulario_entrada,
        formulario_salida: this.formulario_salida,
      };
      // console.log("crear etapa: ", body);
      response = await this.auth.createEtapa(body);
    }
    if (response) {
      this.modalService.dismissAll();
      this.getEtapa();
    }
  }

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
        this.deleteEtapa(id);
      }
    });
  }

  async deleteEtapa(id: number) {
    const response = await this.auth.deleteEtapa(id);
    if (response) {
      this.getEtapa();
    }
  }
}
