import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WebService } from '../../../Service/web.service';
import { MenuComponent } from '../menu/menu.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AlertService } from '../../../Service/alert.service';

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

  constructor(public Service:WebService,public Alert:AlertService,private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }
  ngDoCheck() {
    this.isLoggedIn = !!localStorage.getItem('userToken');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async logout() {
    const confirmation = await this.Alert.confirm("Are you sure to logout?")
    if(confirmation){
      localStorage.removeItem('userToken');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }
}
