import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { Exportadora } from '../../models/exportadora';

@Component({
  selector: 'app-exportadora',
  templateUrl: './exportadora.component.html',
  styleUrls: ['./exportadora.component.css'],
  providers: [TablesService, UserService]
})
export class ExportadoraComponent implements OnInit {

  public exportadora: Exportadora;
  public exportadora2: Exportadora[];
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
    this.exportadora = new Exportadora(null, "", "", "", "", "", "");
    this.exportadora2 = [];
    this.crud = false;
    this.add = false;
    this.verify = false;
    this.temp_id = null;
    this.page = 1;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this.tablesService.getExportadora(this.token).subscribe(
      res => {
        if (res.datos) {
          this.exportadora2 = res.datos;
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
      this.vaciarExportadora();
      this.add = true;
    }
    else {
      this.add = false;
      this.tablesService.getEditExportadora(this.token, id).subscribe(
        res => {
          if (res) {
            this.exportadora = res;
            console.log(this.exportadora.exp_nombre)
            console.log(typeof this.exportadora)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  vaciarExportadora() {
    this.exportadora.exp_id = null;
    this.exportadora.exp_nombre = "";
    this.exportadora.exp_descripcion = "";
    this.exportadora.exp_ruc = "";
    this.exportadora.exp_direccion = "";
    this.exportadora.exp_telefono1 = "";
    this.exportadora.exp_telefono2 = "";
  }

  addExportadora(form: any) {
    this.crud = true;
    this.add = true;
    this.tablesService.addExportadora(this.token, this.exportadora).subscribe(
      res => {
        console.log('agregado')
        form.reset();
        this.vaciarExportadora();
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  editExportadora(form: any, id: Int32Array | null) {
    this.crud = true;
    this.add = false;
    this.tablesService.editExportadora(id, this.exportadora).subscribe(
      res => {
        console.log('editado')
        form.reset();
        this.vaciarExportadora();
        this.crud = false;
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  async deleteExportadora(id: Int32Array | null) {
    if (id != null) {
      this.tablesService.deleteExportadora(this.token, id).subscribe(
        res => {
          if (res.exportadoras){
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