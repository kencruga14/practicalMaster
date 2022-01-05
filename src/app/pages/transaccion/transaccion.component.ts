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
  areasSociales = []
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
  idAreaSocial : any;
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

  nombreUrbanizacion :any;

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
    this.id_etapa=""
    this.idUrbanizacion=""
  }
  restablecerFiltroBusqueda() {
    this.idUrbanizacion=""
    this.id_etapa =""
    this.filtroTipo= ""
    this.idAreaSocial=""
    this.fechaRecaudacionInicio = null
    this.fechaRecaudacionFin = null
    this.valorTotal = 0
    // this.cargarTabla()
  }
  getUrbId(id) {
    this.filtroTipo = ""
    this.id_etapa = ""
    this.fechaRecaudacionInicio = ""
    this.fechaRecaudacionFin = ""
    this.bandera = false
    this.auth.getEtapaByIdUrbanizacion(id).subscribe((resp: any) => {
      this.etapasid = resp;
      if(resp.length >0)  this.nombreUrbanizacion= resp[0].nombre_urbanizacion;
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

  // restablecer() {
  //   this.bandera = false
  //   this.fechaRecaudacionInicio = ""
  //   this.fechaRecaudacionFin = ""
  //   this.filtroTipo = ""
  //   this.cargarTabla();
  // }
// refactoring
  getTablaEtapa(){
    this.filtroTipo= ""
    this.idAreaSocial=""
    this.fechaRecaudacionInicio = null
    this.fechaRecaudacionFin = null
    this.valorTotal = 0
    this.getTabla();
  }

  getTablaModulo(){
    this.idAreaSocial=""
    this.fechaRecaudacionInicio = null
    this.fechaRecaudacionFin = null
    this.valorTotal = 0
    this.getAreasSociales();
    this.getTabla();
  }

  
  getTablaAreaSocial(){
    this.fechaRecaudacionInicio = null
    this.fechaRecaudacionFin = null
    this.valorTotal = 0
    this.getTabla();
  }

  
  cargarTablaFechas1() {
    this.valorTotal = 0
    if(!this.fechaRecaudacionFin) {
      this.auth.getTransaccionTipo(this.id_etapa.ID, this.filtroTipo, moment(this.fechaRecaudacionInicio).format("YYYY-MM-DDTHH:mm:ss[Z]"),"",this.idAreaSocial.ID).subscribe((resp: any) => {
        this.transacciones = resp;
        this.calcularRecaudaciones()
      });
    }else{
      this.auth.getTransaccionTipo(this.id_etapa.ID, this.filtroTipo, moment(this.fechaRecaudacionInicio).format("YYYY-MM-DDTHH:mm:ss[Z]"), moment(this.fechaRecaudacionFin).format("YYYY-MM-DDTHH:mm:ss[Z]"),this.idAreaSocial.ID).subscribe((resp: any) => {
        this.transacciones = resp;
        this.calcularRecaudaciones()
      });
    }
   
  }


  cargarTablaFechas2() {
    this.valorTotal = 0
    this.auth.getTransaccionTipo(this.id_etapa.ID, this.filtroTipo, moment(this.fechaRecaudacionInicio).format("YYYY-MM-DDTHH:mm:ss[Z]"), moment(this.fechaRecaudacionFin).format("YYYY-MM-DDTHH:mm:ss[Z]"),this.idAreaSocial.ID).subscribe((resp: any) => {
      this.transacciones = resp;
      this.calcularRecaudaciones()
    });
  }

  // cargarTabla() {
  //   this.bandera = false
  //   this.valorTotal = 0
  //   this.fechaRecaudacionInicio = ""
  //   this.fechaRecaudacionFin = ""
  //   this.auth.getTransaccionTipo(this.id_etapa, this.filtroTipo, "", "").subscribe((resp: any) => {
  //     this.transacciones = resp;
  //     this.calcularRecaudaciones()
  //   });
  // }



  getTabla(){
    this.auth.getTransaccionTipo(this.id_etapa.ID, this.filtroTipo, "", "",this.idAreaSocial.ID).subscribe((resp: any) => {
      this.transacciones = resp;
      this.calcularRecaudaciones()
    });
  }




  gestionRecaudaciones() {
    let string = "T00:00:00Z"
    this.bandera = true
    this.valorTotal = 0
    // this.cargarTablaFechas()

  }

  calcularRecaudaciones() {
    this.valorTotal = 0;
    this.transacciones.forEach((item) => {
      this.valorTotal = this.valorTotal + parseFloat(item.valor);
    });
  }


  getAreasSociales() {
    this.auth.getAreaSocial( this.id_etapa).subscribe((resp: any) => {
      this.areasSociales = resp;
    });
  }

  getPrueba(e :any){
    console.log(this.idAreaSocial.ID)
    console.log(this.idAreaSocial.nombre)
  }

}
