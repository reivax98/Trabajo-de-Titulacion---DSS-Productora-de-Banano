import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/usuario';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: User;
  public token: any;
  public identity: any;
	public status:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user = new User(null,"","","","","","","");
    this.token = null;
    this.status = "";
   }

  ngOnInit(): void {
    if (localStorage.getItem('identity')){
      this.router.navigate(['dashboard']);
    }
  }
  
  onSubmit() {
    // loguear al usuario y conseguir sus datos
    this.userService.login(this.user).subscribe(
      response => {
        this.identity = response.user;

        console.log(this.identity);
        
        if(!this.identity){
					this.status = 'error';
				}else{
					// PERSISTIR DATOS DEL USUARIO
					localStorage.setItem('identity', JSON.stringify(this.identity));

					// Conseguir el token
					this.obtenerToken();
          this.router.navigate(['/dashboard']);
				}

      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }


  obtenerToken() {
    this.userService.login(this.user, 'true').subscribe(
      response => {
        this.token = response.token;

        console.log(this.token);
        
        if (this.token.length <= 0) {
          this.status = 'error';
        } else {
          // PERSISTIR TOKEN DEL USUARIO
          localStorage.setItem('token', this.token);
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
}
