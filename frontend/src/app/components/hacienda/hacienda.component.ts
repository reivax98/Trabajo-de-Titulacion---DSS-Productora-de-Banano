import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { Hacienda } from '../../models/hacienda';

@Component({
  selector: 'app-hacienda',
  templateUrl: './hacienda.component.html',
  styleUrls: ['./hacienda.component.css'],
  providers: [TablesService, UserService]
})
export class HaciendaComponent implements OnInit {

  public hacienda: Hacienda;
  public hacienda2: Hacienda[];
  public token: any;
  public crud: boolean;
  public add: boolean;
  public verify: boolean;
  public temp_id: any;
  public identity: any;

  constructor(
    private tablesService: TablesService,
    private userService: UserService
  ) {
    this.token = this.userService.getToken();
    this.hacienda = new Hacienda(null, "", null, "", "", "");
    this.hacienda2 = [];
    this.crud = false;
    this.add = false;
    this.verify = false;
    this.temp_id = null;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this.tablesService.getHacienda(this.token).subscribe(
      res => {
        if (res.datos) {
          this.hacienda2 = res.datos;
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
      this.vaciarHacienda();
      this.add = true;
    }
    else {
      this.add = false;
      this.tablesService.getEditHacienda(this.token, id).subscribe(
        res => {
          if (res) {
            this.hacienda = res;
            console.log(this.hacienda.hac_nombre)
            console.log(typeof this.hacienda)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  vaciarHacienda() {
    this.hacienda.hac_id = null;
    this.hacienda.hac_nombre = "";
    this.hacienda.hac_hectareas = null;
    this.hacienda.hac_localidad = "";
    this.hacienda.hac_sector = "";
    this.hacienda.hac_provincia = "";
  }

  addHacienda(form: any) {
    this.crud = true;
    this.add = true;
    this.tablesService.addHacienda(this.token, this.hacienda).subscribe(
      res => {
        console.log('agregado')
        form.reset();
        this.vaciarHacienda();
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  editHacienda(form: any, id: Int32Array | null) {
    this.crud = true;
    this.add = false;
    this.tablesService.editHacienda(id, this.hacienda).subscribe(
      res => {
        console.log('editado')
        form.reset();
        this.vaciarHacienda();
        this.crud = false;
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  async deleteHacienda(id: Int32Array | null) {
    if (id != null) {
      this.tablesService.deleteHacienda(this.token, id).subscribe(
        res => {
          if (res.hac){
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
