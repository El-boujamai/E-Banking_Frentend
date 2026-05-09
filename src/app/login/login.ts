import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  formLogin!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: [''], // Utilisation d'un tableau pour une meilleure pratique
      password: [''],
    });
  }

  public handleLogin() {
    this.errorMessage = null;
    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.authService.loadProfile(data);
        void this.router.navigateByUrl("/admin");
      },
      error: err => {
        this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
        console.error(err);
      }
    });
  }
}
