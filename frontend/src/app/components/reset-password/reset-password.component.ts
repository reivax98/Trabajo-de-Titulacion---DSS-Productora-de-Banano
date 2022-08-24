import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public email: string;
  public newpassword: any;
  public confnewpassword: any;
  private resetToken: any;
  public cambiada: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.email = ''
    this.newpassword = ''
    this.confnewpassword = ''
    this.cambiada = false
    this.route.params.subscribe(params => {
      this.resetToken = params.token;
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('identity')) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit() {
    console.log({ newpassword: this.newpassword })
    console.log(this.resetToken);
    try {
      if (this.newpassword == this.confnewpassword) {
        this.userService.resetPassword({ newpassword: this.newpassword }, this.resetToken).subscribe(
          response => {
            console.log(response);
            this.cambiada = true
          },
          error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
          }
        )
      }
      else {
        alert('LAS CONTRASEÑAS DEBEN SER IGUALES')
      }
    } catch (error) {
      console.log(error);
    }

  }

}
