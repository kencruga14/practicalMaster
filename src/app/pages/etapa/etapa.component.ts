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
  base: any;
  id_etapa: 0;
  fecha_alicuota: "";
  nombre: "";
  nombres: any;
  edit: false;
  correo: "";
  telefono: "";
  imagen = null;
  id: 0;
  urbanizacion: boolean;
  modulo_market: boolean;
  modulo_publicacion: boolean;
  modulo_equipo: boolean;
  modulo_historia: boolean;
  modulo_bitacora: boolean;

  modulo_alicuota: boolean;
  pagos_tarjeta: boolean;
  modulo_emprendimiento: boolean;
  modulo_votacion: boolean;
  modulo_area_social: boolean;
  modulo_camara: boolean;
  modulo_directiva: boolean;
  modulo_galeria: boolean;
  modulo_horario: boolean;
  formularioIngreso: true;
  formularioSalida: true;
  usuario: any;
  tipo_cuenta: "";
  nombre_banco: "";
  numero_cuenta: "";
  tipo_documento: "";
  numero_documento: "";
  id_urbanizacion: 0;
  changeFoto = false;

  filterName = "";
  etapa = {
    usuario: "",
    id_etapa: 0,
    fecha_alicuota: "",
    nombre: "",
    edit: false,
    imagen: null,
    urbanizacion: "",
    correo: "",
    telefono: "",
    tipo_cuenta: "",
    nombre_banco: "",
    numero_cuenta: "",
    tipo_documento: "",
    numero_documento: "",
    modulo_market: false,
    modulo_publicacion: false,
    modulo_votacion: false,
    modulo_area_social: false,
    modulo_equipo: false,
    modulo_historia: false,
    modulo_bitacora: false,
    id_urbanizacion: 0,
    pagos_tarjeta: false,
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
    this.getLastIdEtapa();
  }
  getUrb() {
    this.auth.getUrb().subscribe((resp: any) => {
      console.log(resp);
      this.urbanizaciones = resp;
    });
  }
  openAcceso(content, acceso) {
    this.acceso.id_etapa = acceso.id_etapa;
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

  openInfo(content) {
    this.modalService.open(content);
  }

  openEtapa(content, etapa = null) {
    if (etapa) {
      this.id_etapa = etapa.ID;
      this.id = etapa.ID;
      this.correo = etapa.correo;
      this.telefono = etapa.telefono;
      this.nombre = etapa.nombre;
      this.etapa.edit = true;
      this.fecha_alicuota = etapa.fecha_alicuota;
      this.imagen = null;
      this.tipo_cuenta = etapa.tipo_cuenta;
      this.nombre_banco = etapa.nombre_banco;
      this.numero_cuenta = etapa.numero_cuenta;
      this.tipo_documento = etapa.tipo_documento;
      this.numero_documento = etapa.numero_documento;
      this.modulo_market = etapa.modulo_market;
      this.modulo_publicacion = etapa.modulo_publicacion;
      this.modulo_votacion = etapa.modulo_votacion;
      this.modulo_area_social = etapa.modulo_area_social;
      this.modulo_equipo = etapa.modulo_equipo;
      this.modulo_historia = etapa.modulo_historia;
      this.modulo_bitacora = etapa.modulo_bitacora;
      this.id_urbanizacion = etapa.id_urbanizacion;
      this.pagos_tarjeta = etapa.pagos_tarjeta;
    } else {
      this.id_etapa = 0;
      this.nombre = "";
      this.usuario = "";
      this.correo = "";
      this.telefono = "";
      this.nombre = "";
      this.id_urbanizacion = 0;
      this.tipo_cuenta = "";
      this.nombre_banco = "";
      this.numero_cuenta = "";
      this.tipo_documento = "";
      this.numero_documento = "";
      this.etapa.edit = false;
      this.fecha_alicuota = "";
      this.modulo_market = false;
      this.modulo_publicacion = false;
      this.modulo_votacion = false;
      this.modulo_area_social = false;
      this.modulo_equipo = false;
      this.modulo_historia = false;
      this.pagos_tarjeta = false;
      this.modulo_bitacora = false;
      this.formularioIngreso = true;
      this.formularioSalida = true;
      this.imagen = null;
    }
    this.modalService.open(content);
  }
  getEtapa() {
    this.auth.getEtapa().subscribe((resp: any) => {
      console.log(resp);
      this.etapas = resp;
      this.base = resp;
      console.log("base; ", this.etapas);
    });
  }

  getLastIdEtapa() {
    var output = [];
    var vals=[];
    for(var item of this.base){
       vals.push(item.ID); 
    }
    console.log("valor: ", vals)
    // return output;
}
    // return suma;
  // }

  async gestionEtapa() {
    let response: any;
    if (this.etapa.edit) {
      const body = {
        id_urbanizacion: this.id_urbanizacion,
        nombre: this.nombre,
        usuario: this.usuario,
        correo: this.correo,
        telefono: this.telefono,
        nombre_banco: this.nombre_banco,
        tipo_cuenta: this.tipo_cuenta,
        numero_cuenta: this.numero_cuenta,

        modulo_mi_registro: this.modulo_market,
        formulario_entrada: this.modulo_publicacion,
        formulario_salida: this.modulo_votacion,
        pagos_tarjeta: this.modulo_area_social,
        modulo_alicuota: this.modulo_equipo,
        modulo_emprendimiento: this.modulo_historia,
        modulo_votacion: this.modulo_bitacora,
        modulo_area_social: this.pagos_tarjeta,
      };
      console.log("modificar etapa: ", body);
      // response = await this.auth.editEtapa(this.id, body);
    } else {
      const body = {
        id_urbanizacion: this.id_urbanizacion,
        nombre: this.nombre,
        usuario: this.usuario,
        correo: this.correo,
        telefono: this.telefono,
        nombre_banco: this.nombre_banco,

        modulo_mi_registro: true,
        formulario_entrada: true,
        formulario_salida: true,
        pagos_tarjeta: true,
        modulo_alicuota: true,
        modulo_emprendimiento: true,
        modulo_votacion: true,
        modulo_area_social: true,
      };
      console.log("modificar etapa: ", body);
      let lastId = this.getLastIdEtapa();
      console.log("last Id: ", lastId);
      let datosUsuarios = {
        id_etapa: lastId,
        cedula: null,
        usuario: {
          nombres: this.nombre,
          usuario: this.usuario,
          correo: this.correo,
          telefono: this.telefono,
        },
      };

      this.createUser(datosUsuarios);
      // response = await this.auth.createEtapa(body);
    }
    if (response) {
      // let usuario = {
      //   nombre: this.nombre,
      //   usuario: this.usuario,
      //   correo: this.correo,
      //   telefono: this.telefono,
      // };

      // this.createUser(usuario);
      this.modalService.dismissAll();
      this.getEtapa();
    }
  }

  createUser(objeto: any) {
    console.log("Datos del usuario a crear: ", objeto);
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
