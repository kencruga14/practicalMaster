import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  visitas: UsuarioModelo[] = [];
  etapas: UsuarioModelo[] = [];
  id_visita: 0;
    cedula: '';
    nombres: '';
    edit: false;
    motivo: '';
    placa: '';
    accesos: '';
    id: 0;
    ID: 0;


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

  menu = ['Bítacora'];
  constructor(public auth: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute ) { }


    ngOnInit() {
      this.getEtapa();
      const id = Number(this.activatedRoute.snapshot.paramMap.get('ID'));


    }
 

    getEtapa() {
      this.auth.getEtapa()
      .subscribe( (resp: any) => {
        // console.log(resp);
        this.etapas = resp;
      });
    }


  


  }
