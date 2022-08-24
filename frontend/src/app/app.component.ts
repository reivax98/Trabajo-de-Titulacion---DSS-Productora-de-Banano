import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Tierra Prometida';

  public identity: any;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this.userService.getIdentity();
  }
}
