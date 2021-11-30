import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioModelo } from "src/app/models/usuario.model";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
@Component({
  selector: "app-transaccion",
  templateUrl: "./transaccion.component.html",
  styleUrls: ["./transaccion.component.css"],
})
export class TransaccionComponent implements OnInit {
  transacciones: UsuarioModelo[] = [];
  etapas: UsuarioModelo[] = [];

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
  ) {}

  ngOnInit() {
    this.getTransaccion();
    this.getUrb();
  }

  getUrbId(id) {
    // console.log("id: ", id);
    // console.log("id_etapa ", this.id_etapa);
    this.auth.getEtapaByIdUrbanizacion(id).subscribe((resp: any) => {
      this.etapasid = resp;
      console.log("etapas por id: ", this.etapasid);
    });
  }

  getTransaccion() {
    this.auth.getTransaccion().subscribe((resp: any) => {
      console.log(resp);
      this.transacciones = resp;
    });
  }

  async gestionTransaccion(id_transaccion: number) {
    let response: any;

    response = await this.auth.sendTransaccion(id_transaccion);
  }

  getUrb() {
    this.auth.getUrb().subscribe((resp: any) => {
      console.log("urbanizaciones: ", resp);
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
}
