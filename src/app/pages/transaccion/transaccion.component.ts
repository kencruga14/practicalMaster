import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioModelo } from "src/app/models/usuario.model";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import * as moment from "moment";
@Component({
  selector: "app-transaccion",
  templateUrl: "./transaccion.component.html",
  styleUrls: ["./transaccion.component.css"],
})
export class TransaccionComponent implements OnInit {
  transacciones: any = [];
  valorTotal = 0;
  bandera = false
  etapas: UsuarioModelo[] = [];
  filtroTipo: any = ""
  fechaRecaudacionInicio = ""
  fechaRecaudacionFin = ""
  estado_pago: "";
  dia_pago: "";
  monto: "";
  codigo_autorizacion: "";
  mensaje: "";
  descripcion: "";
  tipo: "";
  estado_devolucion: "";
  detalle_devolucion: "";
  tarjeta_id: 0;
  id_transaccion: 0;
  id_etapa: any;
  etapasid: any;
  urbanizaciones: UsuarioModelo[] = [];
  idUrbanizacion: any;
  filterName = "";
  transaccion = {
    estado_pago: "",
    dia_pago: "",
    monto: "",
    codigo_autorizacion: "",
    mensaje: "",
    descripcion: "",
    tipo: "",
    estado_devolucion: "",
    detalle_devolucion: "",
    tarjeta_id: 0,
  };

  menu = ["Transacciones"];
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.getTransaccion();
    this.getUrb();
    this.filtroTipo = ""
    this.fechaRecaudacionInicio = ""
    this.fechaRecaudacionFin = ""
  }
  restablecerFiltroBusqueda() {
    this.fechaRecaudacionInicio = null
    this.fechaRecaudacionFin = null
    this.cargarTabla()
  }
  getUrbId(id) {
    this.filtroTipo = ""
    this.id_etapa = ""
    this.fechaRecaudacionInicio = ""
    this.fechaRecaudacionFin = ""
    this.bandera = false
    this.auth.getEtapaByIdUrbanizacion(id).subscribe((resp: any) => {
      this.etapasid = resp;
    });
  }



  async gestionTransaccion(id_transaccion: number) {
    let response: any;
    response = await this.auth.sendTransaccion(id_transaccion);
  }

  getUrb() {
    this.auth.getUrb().subscribe((resp: any) => {
      this.urbanizaciones = resp;
    });
  }

  getEtapa() {
    this.auth.getEtapa().subscribe((resp: any) => {
      this.etapas = resp;
    });
  }

  restablecer() {
    this.bandera = false
    this.fechaRecaudacionInicio = ""
    this.fechaRecaudacionFin = ""
    this.filtroTipo = ""
    this.cargarTabla();
  }

  cargarTabla() {
    this.bandera = false
    this.valorTotal = 0
    this.fechaRecaudacionInicio = ""
    this.fechaRecaudacionFin = ""
    this.auth.getTransaccionTipo(this.id_etapa, this.filtroTipo, "", "").subscribe((resp: any) => {
      this.transacciones = resp;
      this.calcularRecaudaciones()
    });
  }

  cargarTablaFechas() {
    this.valorTotal = 0
    this.auth.getTransaccionTipo(this.id_etapa, this.filtroTipo, moment(this.fechaRecaudacionInicio).format("YYYY-MM-DDTHH:mm:ss[Z]"), moment(this.fechaRecaudacionFin).format("YYYY-MM-DDTHH:mm:ss[Z]")).subscribe((resp: any) => {
      this.transacciones = resp;
      this.calcularRecaudaciones()
    });
  }


  gestionRecaudaciones() {
    let string = "T00:00:00Z"
    this.bandera = true
    this.valorTotal = 0
    this.cargarTablaFechas()

  }

  calcularRecaudaciones() {
    this.valorTotal = 0;
    this.transacciones.forEach((item) => {
      this.valorTotal = this.valorTotal + parseFloat(item.valor);
    });
  }

}
