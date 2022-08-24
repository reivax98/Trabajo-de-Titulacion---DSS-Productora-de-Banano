import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/usuario';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public user: User;
  public token: any;
  public claveconf: string;
  public identity: any;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user = new User(null,"","","","","","","");
    this.token = null;
    this.claveconf = ""
   }

  ngOnInit(): void {
    console.log('entro en crear usuario')
    this.identity = this.userService.getIdentity();
    if (this.identity.rol=='USER'){
      alert('NO TIENE LOS PERMISOS PARA ESTA FUNCIÓN')
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(form: any) {
    console.log(this.user.us_rol);
    if (this.claveconf == this.user.us_clave){
      this.userService.registro(this.user).subscribe(
        response => {
          if (response.user) {
            alert('Usuario registrado');
            form.reset();
          } else {
            console.log('error');
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    } else {
      alert('Las claves deben coincidir');
    }
  }

}
