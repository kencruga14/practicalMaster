import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminetapa',
  templateUrl: './adminetapa.component.html',
  styleUrls: ['./adminetapa.component.css']
})
export class AdminetapaComponent implements OnInit {


  title = 'testJobNestedArray';
  searchableList: any;
  searchText : string = "";
  users : any;

  etapas: UsuarioModelo[] = [];
  admins: UsuarioModelo[] = [];
  id_adminetapa: 0;
  id_etapa: 0;
    correo: '';
    nombres: '';
    edit: false;
    contrasena: '';
    usuario: '';
    telefono: '';
    celular: '';
    cedula: '';
    accesos: '';
    imagen = null;
    id: 0;
    changeFoto= false;

  filterName = '';
  admin = {
    id_adminetapa: 0,
    id_etapa: 0,
    cedula: '',
    correo: '',
    celular: '',
    nombres: '',
    edit: false,
    contrasena: '',
    usuario: '',
    telefono: '',
    imagen:null,
  };
  acceso = {
    accesos: '',
    id_adminetapa: '',
  };

  menu = ['Administradores de Etapa'];
  constructor(public auth: AuthService,
              private router: Router,
              private modalService: NgbModal, ) { }


    ngOnInit() {
      this.getAdminEtapa();
      this.getEtapa();


    }


    openAcceso(content, acceso) {
      this.acceso.id_adminetapa = acceso.id_adminetapa;
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

    openAdminEtapa(content, admin = null) {
      if (admin) {
        this.id_adminetapa = admin.usuario.id_adminetapa;
        this.id = admin.ID;
        this.correo = admin.correo;
        this.contrasena = admin.clave;
        this.nombres = admin.usuario.nombres;
        this.admin.edit = true;
        this.usuario = admin.usuario.usuario;
        this.telefono = admin.usuario.telefono;
        this.contrasena = admin.usuario.contrasena;
        this.celular = admin.usuario.celular;
        this.cedula = admin.cedula;
        this.id_etapa = admin.id_etapa;
        this.imagen = null;
      } else {
        this.id_adminetapa = 0;
        this.id_etapa = 0;
        this.cedula = '';
        this.celular = '';
        this.correo = '';
        this.nombres = '';
        this.contrasena = '';
        this.admin.edit = false;
        this.telefono = '';
        this.usuario = '';
        this.imagen = null;
      }
      this.modalService.open(content);
    }
    getAdminEtapa() {
      this.auth.getAdminEtapa()
      .subscribe( (resp: any) => {
        console.log(resp);
        this.admins = resp;
        console.log("admin etapas: ", this.admins)
      });
    }

    getEtapa() {
      this.auth.getEtapa()
      .subscribe( (resp: any) => {
        console.log(resp);
        this.etapas = resp;
      });
    }


    async gestionAdminEtapa() {
      let response: any;
      if (this.admin.edit) {
        const body = {
          id_etapa: this.id_etapa,
          cedula: this.cedula,
          usuario:{
          nombres: this.nombres,
          imagen: this.imagen,
          celular: this.celular,
          correo: this.correo,
          telefono: this.telefono,
          usuario: this.usuario,
          contrasena: this.contrasena,

        }};
        JSON.stringify(body);
        response = await this.auth.editAdminEtapa(this.id, body);
      } else {
        const body =  {
          id_etapa: this.id_etapa,
          cedula: this.cedula,
          usuario:{
          imagen: this.imagen,
          nombres: this.nombres,
          correo: this.correo,
          telefono: this.telefono,
          usuario: this.usuario,
          contrasena: this.contrasena,
          celular: this.celular,
        }};
        JSON.stringify(body);
        console.log(body)
        response = await this.auth.createAdminEtapa(body);

      }
      if (response) {
        this.modalService.dismissAll();
        this.getAdminEtapa();
      }
    }
    delete(id: number) {
      Swal.fire({
        title: '¿Seguro que desea eliminar este registro?',
        text: 'Esta acción no se puede reversar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#343A40',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.deleteAdminEtapa(id);
        }
      });
    }



    async deleteAdminEtapa(id: number) {
      const response = await this.auth.deleteAdmin(id);
      if (response) {
        this.getAdminEtapa();
      }
    }
}
