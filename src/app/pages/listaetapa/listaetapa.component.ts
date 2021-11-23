import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaetapa',
  templateUrl: './listaetapa.component.html',
  styleUrls: ['./listaetapa.component.css']
})
export class ListaetapaComponent implements OnInit {
  etapas: {
    tipo_cuenta: string;
    nombre_banco:string;
    numero_cuenta:string;
    tipo_documento:string;
    numero_documento:string;
    pagos_tarjeta: boolean;
    modulo_area_social: boolean;
    modulo_bitacora: boolean;
    modulo_equipo: boolean;
    modulo_historia: boolean;
    modulo_market: boolean;
    modulo_publicacion: boolean;
    modulo_votacion: boolean;

  };
  id_etapa: 0;
  tipo_cuenta: '';
  nombre_banco:'';
  numero_cuenta:'';
  tipo_documento:'';
  numero_documento:'';
    accesos: '';
    id: 0;


  filterName = '';
  visita = {
    id_etapa: 0,
    tipo_cuenta: '',
    nombre_banco:'',
    numero_cuenta:'',
    tipo_documento:'',
    numero_documento:'',
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
      this.getEtapa(id);
      this.getName(nombre);

    }

    getName(nombre: any){
      this.menu.push(nombre)

    }

    getEtapa(id: number) {
      this.auth.getEtapaById(id)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.etapas = resp;
      });
    }
   

  }
