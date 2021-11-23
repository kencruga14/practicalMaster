import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listabitacora',
  templateUrl: './listabitacora.component.html',
  styleUrls: ['./listabitacora.component.css']
})
export class ListabitacoraComponent implements OnInit {
  bitacoras: UsuarioModelo[] = [];
  id_visita: 0;
    cedula: '';
    nombres: '';
    edit: false;
    motivo: '';
    placa: '';
    accesos: '';
    id: 0;


  filterName = '';
  visita = {
    id_visita: 0,
    cedula: '',
    nombres: '',
    edit: false,
    motivo: '',
    placa: '',
    id_casa: 0,
    imagen: null,
  };

  menu = [];
  constructor(public auth: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute ) { }


    ngOnInit() {
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      console.log(id)
      const nombre = this.activatedRoute.snapshot.paramMap.get('name');
      console.log(nombre)
      this.getBitacora(id);
      this.getName(nombre);

    }

    getName(nombre: any){
      this.menu.push(nombre)

    }

    getBitacora(id: number) {
      this.auth.getBitacoraById(id)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.bitacoras = resp;
      });
    }
   

  }
