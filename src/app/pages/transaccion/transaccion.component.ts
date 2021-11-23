import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {
  transacciones: UsuarioModelo[] = [];
  estado_pago: '';
  dia_pago:'';
  monto: '';
  codigo_autorizacion: '';
  mensaje: '';
  descripcion: '';
  tipo: '';
  estado_devolucion: '';
  detalle_devolucion: '';
  tarjeta_id: 0;
  id_transaccion:0;


  filterName = '';
  transaccion = {
  estado_pago: '',
  dia_pago:'',
  monto: '',
  codigo_autorizacion: '',
  mensaje: '',
  descripcion: '',
  tipo: '',
  estado_devolucion: '',
  detalle_devolucion: '',
  tarjeta_id: 0
  };
 

  menu = ['Transacciones'];
  constructor(public auth: AuthService,
              private router: Router,
              private modalService: NgbModal, ) { }


    ngOnInit() {
      this.getTransaccion();

    }
   

    getTransaccion() {
      this.auth.getTransaccion()
      .subscribe( (resp: any) => {
        console.log(resp);
        this.transacciones = resp;
      });
    }


    async gestionTransaccion(id_transaccion:number) {
      let response: any;
      
        response = await this.auth.sendTransaccion(id_transaccion);
    }
  
}
