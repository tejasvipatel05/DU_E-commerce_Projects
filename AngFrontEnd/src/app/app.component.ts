import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngProject';
  showNavbar:boolean = true;

  constructor(private router:Router){

    router.events.subscribe(()=>{
      this.showNavbar =!['/login','/register'].includes(this.router.url);
    })
  }
}
