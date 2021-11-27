import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UsuarioModelo } from "src/app/models/usuario.model";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
@Component({
  selector: "app-publicidad",
  templateUrl: "./publicidad.component.html",
  styleUrls: ["./publicidad.component.css"],
})
export class PublicidadComponent implements OnInit {
  publicidades: UsuarioModelo[] = [];
  urbanizaciones: UsuarioModelo[] = [];
  idUrbanizacion: any;
  id_publicidad: 0;
  id_etapa: 0;
  imagenPerfil: any;
  etapasid: any;
  urbs: any;
  prioridad: 0;
  idEtapa: "";
  edit: false;
  imagen = null;
  etapa_id: 0;
  empresa: any;
  documento: any;
  telefono: any;
  id: 0;
  changeFoto = false;
  etapas: UsuarioModelo[] = [];

  filterName = "";
  publicidad = {
    id_publicidad: 0,
    empresa: "",
    documento: "",
    telefono: "",
    edit: false,
    imagen: null,
  };
  acceso = {
    accesos: "",
    id_publicidad: "",
  };

  // menu = ["Publicidad"];
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUrb();
    // this.getPublicidad();
  }
  getUrb() {
    this.auth.getUrb().subscribe((resp: any) => {
      console.log(resp);
      this.urbanizaciones = resp;
    });
  }

  getUrbId(id) {
    console.log("id: ", id);
    this.auth.getEtapaByIdUrbanizacion(id).subscribe((resp: any) => {
      this.etapasid = resp;
      this.publicidades = [];
    });
  }

  openAcceso(content, acceso) {
    this.acceso.id_publicidad = acceso.id_publicidad;
    this.modalService.open(content);
  }
  preview(event: any) {
    console.log("entró preview:");
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
      // this.prioridad = publicidad.nombre;
      this.publicidad.edit = true;
      this.imagen = null;
      this.etapa_id = publicidad.etapa_id;
      this.empresa = publicidad.empresa;
      this.documento = publicidad.documento;
      this.telefono = publicidad.telefono;
    } else {
      // this.id_publicidad = 0;
      this.publicidad.edit = false;
      this.imagen = null;
      this.etapa_id = 0;
      this.empresa = "";
      this.documento = "";
      this.telefono = "";
    }
    this.modalService.open(content);
  }
  // getPublicidad() {
  //   this.auth.getPublicidad().subscribe((resp: any) => {
  //     this.publicidades = resp;
  //   });
  // }

  async gestionPublicidad() {
    let response: any;
    let ids = Number(this.id_etapa);
    if (this.publicidad.edit) {
      const body = {
        etapa_id: Number(this.id_etapa),
        imagen: this.imagen,
        empresa: this.empresa,
        documento: this.documento,
        telefono: this.telefono,
      };
      console.log("body editar publicidad: ", body);
      response = await this.auth.editPublicidad(this.id, body);
    } else {
      // console.log("tipo id_etapa: ", typeof this.id_etapa);
      const body = {
        etapa_id: Number(this.id_etapa),
        imagen: this.imagen,
        empresa: this.empresa,
        documento: this.documento,
        telefono: this.telefono,
      };
      console.log("body crear publicidad: ", body);
      response = await this.auth.createPublicidad(body);
    }
    if (response) {
      this.modalService.dismissAll();
      this.getPublicidadbIdEtapa(ids);
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
      // this.getPublicidad();
    }
  }

  getPublicidadbIdEtapa(value) {
    console.log("id_etapa: ", value);
    this.auth.getPublicidadIdEtapa(value).subscribe((resp: any) => {
      this.publicidades = resp;
    });
  }

  openImage(content, admin) {
    this.imagenPerfil = admin;
    // console.log("imagen perfil: ", this.imagenPerfil);
    this.modalService.open(content);
  }
}
