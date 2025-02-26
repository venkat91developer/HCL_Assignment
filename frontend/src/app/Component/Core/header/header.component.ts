import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WebService } from '../../../Service/web.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  providers:[WebService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = false;
  constructor(public Service:WebService){}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
