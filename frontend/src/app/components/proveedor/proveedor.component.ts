import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [TablesService, UserService]
})
export class ProveedorComponent implements OnInit {

  public proveedor: Proveedor;
  public proveedor2: Proveedor[];
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
    this.proveedor = new Proveedor(null, "", "", "", "");
    this.proveedor2 = [];
    this.crud = false;
    this.add = false;
    this.verify = false;
    this.temp_id = null;
    this.page = 1;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this.tablesService.getProveedor(this.token).subscribe(
      res => {
        if (res.datos) {
          this.proveedor2 = res.datos;
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
      this.vaciarProveedor();
      this.add = true;
    }
    else {
      this.add = false;
      this.tablesService.getEditProveedor(this.token, id).subscribe(
        res => {
          if (res) {
            this.proveedor = res;
            console.log(this.proveedor.prov_nombre)
            console.log(typeof this.proveedor)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  vaciarProveedor() {
    this.proveedor.prov_id = null;
    this.proveedor.prov_nombre = "";
    this.proveedor.prov_ruc_cedula = "";
    this.proveedor.prov_telefono1 = "";
    this.proveedor.prov_telefono2 = "";
  }

  addProveedor(form: any) {
    this.crud = true;
    this.add = true;
    this.tablesService.addProveedor(this.token, this.proveedor).subscribe(
      res => {
        console.log('agregado')
        form.reset();
        this.vaciarProveedor();
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  editProveedor(form: any, id: Int32Array | null) {
    this.crud = true;
    this.add = false;
    this.tablesService.editProveedor(id, this.proveedor).subscribe(
      res => {
        console.log('editado')
        form.reset();
        this.vaciarProveedor();
        this.crud = false;
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  async deleteProveedor(id: Int32Array | null) {
    if (id != null) {
      this.tablesService.deleteProveedor(this.token, id).subscribe(
        res => {
          if (res.prov){
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
