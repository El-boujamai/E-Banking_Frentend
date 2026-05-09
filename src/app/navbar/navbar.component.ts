import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  public handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}




