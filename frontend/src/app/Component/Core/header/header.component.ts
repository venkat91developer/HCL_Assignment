import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WebService } from '../../../Service/web.service';
import { MenuComponent } from '../menu/menu.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MenuComponent,RouterModule],
  providers:[WebService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = false;
  isLoggedIn: boolean = false;
  isLoginPage: boolean = false;

  constructor(public Service:WebService,private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }
  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('userToken');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
