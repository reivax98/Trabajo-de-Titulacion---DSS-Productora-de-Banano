import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { Empleado } from '../../models/empleado';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [TablesService, UserService]
})

export class EmpleadoComponent implements OnInit {

  public empleado: Empleado;
  public empleado2: Empleado[];
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
    this.empleado = new Empleado(null, "");
    this.empleado2 = [];
    this.crud = false;
    this.add = false;
    this.verify = false;
    this.temp_id = null;
    this.page = 1;
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this.tablesService.getEmpleado(this.token).subscribe(
      res => {
        if (res.datos) {
          this.empleado2 = res.datos;
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
      this.vaciarEmpleado();
      this.add = true;
    }
    else {
      this.add = false;
      this.tablesService.getEditEmpleado(this.token, id).subscribe(
        res => {
          if (res) {
            this.empleado = res;
            console.log(this.empleado.emp_nombre_completo)
            console.log(typeof this.empleado)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  vaciarEmpleado() {
    this.empleado.emp_id = null;
    this.empleado.emp_nombre_completo = "";
  }

  addEmpleado(form: any) {
    this.crud = true;
    this.add = true;
    this.tablesService.addEmpleado(this.token, this.empleado).subscribe(
      res => {
        console.log('agregado')
        form.reset();
        this.vaciarEmpleado();
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  editEmpleado(form: any, id: Int32Array | null) {
    this.crud = true;
    this.add = false;
    this.tablesService.editEmpleado(id, this.empleado).subscribe(
      res => {
        console.log('editado')
        form.reset();
        this.vaciarEmpleado();
        this.crud = false;
        this.ngOnInit();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  async deleteEmpleado(id: Int32Array | null) {
    if (id != null) {
      this.tablesService.deleteEmpleado(this.token, id).subscribe(
        res => {
          if (res.empleados) {
            console.log('borrado')
            console.log(res)
            this.temp_id = null;
            this.ngOnInit();
          }
          else {
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
