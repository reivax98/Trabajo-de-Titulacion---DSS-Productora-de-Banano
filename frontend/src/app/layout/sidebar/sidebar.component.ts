import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService]
})
export class SidebarComponent implements OnInit {

  public n_user: string
  public identity: any;

  constructor(
    private userService: UserService
  ) {
    this.n_user = userService.getIdentity().us_nombres + ' ' + userService.getIdentity().us_apellidos
  }

  ngOnInit(): void {
    this.identity = this.userService.getIdentity();
  }


}
