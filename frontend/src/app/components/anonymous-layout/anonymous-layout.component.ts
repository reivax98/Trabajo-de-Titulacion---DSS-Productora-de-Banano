import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-anonymous-layout',
  templateUrl: './anonymous-layout.component.html',
  styleUrls: ['./anonymous-layout.component.css'],
  providers: [UserService]
})
export class AnonymousLayoutComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
