import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioModelo } from "src/app/models/usuario.model";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
@Component({
  selector: "app-residente",
  templateUrl: "./residente.component.html",
  styleUrls: ["./residente.component.css"],
})
export class ResidenteComponent implements OnInit {
  publicidades: UsuarioModelo[] = [];
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

  menu = ["Publicidad"];
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

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

  getUrbId(id) {
    // console.log("id: ", id);
    // console.log("id_etapa ", this.id_etapa);
    this.auth.getEtapaByIdUrbanizacion(id).subscribe((resp: any) => {
      this.etapasid = resp;
      console.log("etapas por id: ", this.etapasid);
    });
  }

  getEtapa() {
    this.auth.getEtapa().subscribe((resp: any) => {
      // console.log(resp);
      this.etapas = resp;
      // console.log("etapas");
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
}
