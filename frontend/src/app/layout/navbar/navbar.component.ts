import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public identity: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  
  logout(){
    localStorage.clear();
    this.identity = null;
    this.router.navigate(['/login']);
  }
}
