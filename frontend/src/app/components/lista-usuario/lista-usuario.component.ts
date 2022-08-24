import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablesService } from '../../services/tables.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/usuario';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css'],
  providers: [TablesService, UserService]
})
export class ListaUsuarioComponent implements OnInit {

  public usuario: User;
  public usuario2: User[];
  public token: any;
  public crud: boolean;
  public add: boolean;
  public verify: boolean;
  public temp_id: any;
  public identity: any;

  constructor(
    private tablesService: TablesService,
    private userService: UserService,
    private router: Router,
  ) {
    this.token = this.userService.getToken();
    this.usuario = new User(null, "", "", "", "", "", "", "");
    this.usuario2 = [];
    this.crud = false;
    this.add = false;
    this.verify = false;
    this.temp_id = null;
    this.identity = null;
  }

  ngOnInit(): void {
    this.identity = this.userService.getIdentity();
    if (this.identity.us_rol == 'USER'){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.tablesService.getListaUsuario(this.token).subscribe(
        res => {
          if (res.datos) {
            this.usuario2 = res.datos;
          }
        },
        err => console.log(err)
      )
    }
  }

  guardarTempId(id: any) {
    this.temp_id = id
    console.log(this.temp_id)
  }

  actions(ac: string, id: Int32Array | null) {
    this.crud = true;
    if (ac == 'add') {
      this.vaciarListaUsuario();
      this.add = true;
    }
    else {
      this.add = false;
      this.tablesService.getEditListaUsuario(this.token, id).subscribe(
        res => {
          if (res) {
            this.usuario = res;
            console.log(this.usuario)
            console.log(typeof this.usuario)
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  vaciarListaUsuario() {
    this.usuario.us_id = null;
    this.usuario.us_nombres = "";
    this.usuario.us_apellidos = null;
    this.usuario.us_correo = "";
    this.usuario.us_telefono = "";
    this.usuario.us_genero = "";
    this.usuario.us_rol = "";
    this.usuario.us_clave = "";

  }

  addUsuario(form: any) {
    this.crud = true;
    this.add = true;
    this.tablesService.addListaUsuario(this.token, this.usuario).subscribe(
      res => {
        if (res.user){
          console.log(res)
          console.log('agregado')
          form.reset();
          this.vaciarListaUsuario();
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
  }

  editUsuario(form: any, id: Int32Array | null) {
    this.crud = true;
    this.add = false;
    this.tablesService.editListaUsuario(id, this.usuario).subscribe(
      res => {
        if (res.usuario){
          console.log('editado')
          console.log(this.usuario)
          form.reset();
          this.vaciarListaUsuario();
          this.crud = false;
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
  }

  async deleteUsuario(id: Int32Array | null) {
    if (id != null) {
      this.tablesService.deleteListaUsuario(this.token, id).subscribe(
        res => {
          if (res.user){
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
