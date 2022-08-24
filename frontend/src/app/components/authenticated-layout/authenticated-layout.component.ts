import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.css'],
  providers: [UserService]
})
export class AuthenticatedLayoutComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
