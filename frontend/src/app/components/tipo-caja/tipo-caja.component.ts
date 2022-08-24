import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { TipoCaja } from '../../models/tipo-caja';

@Component({
  selector: 'app-tipo-caja',
  templateUrl: './tipo-caja.component.html',
  styleUrls: ['./tipo-caja.component.css'],
  providers: [TablesService, UserService]
})
export class TipoCajaComponent implements OnInit {

  public tipocaja: TipoCaja;
  public tipocaja2: TipoCaja[];
  public token: any;
  public crud: boolean;
  public add: boolean;
  public verify: boolean;
  public temp_id: any;
  public page: number;
  public identity: any;


  constructor(
    private tablesService: TablesService,
    private userService: UserService
  ) {
    this.token = this.userService.getToken();
    this.tipocaja = new TipoCaja(null, "");
    this.tipocaja2 = [];
    this.crud = false;
    this.add = false;
    this.verify = false;
    this.temp_id = null;
    this.page = 1;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this.tablesService.getTipoCaja(this.token).subscribe(
      res => {
        if (res.datos) {
          this.tipocaja2 = res.datos;
        }
      },
      err => console.log(err)
    )
  }

  guardarTempId(id: any) {
    this.temp_id = id
    console.log(this.temp_id)
  }

  actions(ac: string, id: Int32Array | null) {
    this.crud = true;
    if (ac == 'add') {
      this.vaciarTipoCaja();
      this.add = true;
    }
    else {
      this.add = false;
      this.tablesService.getEditTipoCaja(this.token, id).subscribe(
        res => {
          if (res) {
            this.tipocaja = res;
            console.log(this.tipocaja.tipcaj_nombre)
            console.log(typeof this.tipocaja)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  vaciarTipoCaja() {
    this.tipocaja.tipcaj_id = null;
    this.tipocaja.tipcaj_nombre = "";
  }

  addTipoCaja(form: any) {
    this.crud = true;
    this.add = true;
    this.tablesService.addTipoCaja(this.token, this.tipocaja).subscribe(
      res => {
        console.log('agregado')
        form.reset();
        this.vaciarTipoCaja();
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  editTipoCaja(form: any, id: Int32Array | null) {
    this.crud = true;
    this.add = false;
    this.tablesService.editTipoCaja(id, this.tipocaja).subscribe(
      res => {
        console.log('editado')
        form.reset();
        this.vaciarTipoCaja();
        this.crud = false;
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  async deleteTipoCaja(id: Int32Array | null) {
    if (id != null) {
      this.tablesService.deleteTipoCaja(this.token, id).subscribe(
        res => {
          if (res.tipcaj){
            console.log('borrado')
            console.log(res)
            this.temp_id = null;
            this.ngOnInit();
          }
          else{
            alert(res.message)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    } else {
      console.log('Debe verificar')
    }
  }

}
