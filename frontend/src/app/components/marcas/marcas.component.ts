import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { Marca } from '../../models/marca';


@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css'],
  providers: [TablesService, UserService]
})
export class MarcasComponent implements OnInit {

  public marca: Marca;
  public marca2: Marca[];
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
    this.marca = new Marca(null, "");
    this.marca2 = [];
    this.crud = false;
    this.add = false;
    this.verify = false;
    this.temp_id = null;
    this.page = 1;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this.tablesService.getMarca(this.token).subscribe(
      res => {
        if (res.datos) {
          this.marca2 = res.datos;
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
      this.vaciarMarca();
      this.add = true;
    }
    else {
      this.add = false;
      this.tablesService.getEditMarca(this.token, id).subscribe(
        res => {
          if (res) {
            this.marca = res;
            console.log(this.marca.mar_nombre)
            console.log(typeof this.marca)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  vaciarMarca() {
    this.marca.mar_id = null;
    this.marca.mar_nombre = "";
  }

  addMarca(form: any) {
    this.crud = true;
    this.add = true;
    this.tablesService.addMarca(this.token, this.marca).subscribe(
      res => {
        console.log('agregado')
        form.reset();
        this.vaciarMarca();
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  editMarca(form: any, id: Int32Array | null) {
    this.crud = true;
    this.add = false;
    this.tablesService.editMarca(id, this.marca).subscribe(
      res => {
        console.log('editado')
        form.reset();
        this.vaciarMarca();
        this.crud = false;
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  async deleteMarca(id: Int32Array | null) {
    if (id != null) {
      this.tablesService.deleteMarca(this.token, id).subscribe(
        res => {
          if (res.marca){
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

