import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModelo } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  markets: UsuarioModelo[] = [];

  id_market: 0;
    nombre: '';
    edit: false;
    imagen=null;
    id: 0;
    changeFoto = false;


  filterName = '';
  market = {
    id_market: 0,
    nombre: '',
    edit: false,
    imagen:null,
  };
  acceso = {
    accesos: '',
    id_market: '',
  };

  menu = ['Categoría de Emprendimiento'];
  constructor(public auth: AuthService,
              private router: Router,
              private modalService: NgbModal, ) { }


    ngOnInit() {
      this.getMarket();


    }

    openAcceso(content, acceso) {
      this.acceso.id_market = acceso.id_market;
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
        console.log(reader.result)
      };
      this.changeFoto = true;
    }

    openMarket(content, market = null) {
      if (market) {
        this.id_market = market.ID;
        this.id = market.ID;
        this.nombre = market.nombre;
        this.market.edit = true;
        this.imagen = null;
      } else {
        this.id_market = 0;
        this.nombre = '';
        this.market.edit = false;
        this.imagen = null;
      }
      this.modalService.open(content);
    }
    getMarket() {
      this.auth.getMarket()
      .subscribe( (resp: any) => {
        console.log(resp);
        this.markets = resp;
      });
    }




    async gestionMarket() {
      let response: any;
      if (this.market.edit) {
        const body = {
          nombre : this.nombre,
          imagen : this.imagen,
        };

        response = await this.auth.editMarket(this.id, body);
      } else {
        const body =  {
          nombre : this.nombre,
          imagen : this.imagen,
        };

        response = await this.auth.createMarket(body);
      }
      if (response) {
        this.modalService.dismissAll();
        this.getMarket();
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
          this.deleteMarket(id);
        }
      });
    }



    async deleteMarket(id: number) {
      const response = await this.auth.deleteMarket(id);
      if (response) {
        this.getMarket();
      }
    }
}
