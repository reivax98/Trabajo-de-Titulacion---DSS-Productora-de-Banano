import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  public us_correo: any;
  public enviado: boolean;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.enviado = false
    this.us_correo = ''
   }

  ngOnInit(): void {
    if (localStorage.getItem('identity')){
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit() {
    this.userService.getForgotPassword({us_correo: this.us_correo}).subscribe(
      response => {
        console.log(response);
        this.us_correo = ''
        this.enviado = true
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      }
    )
  }

}
