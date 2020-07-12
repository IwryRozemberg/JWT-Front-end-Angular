import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public titulo = 'Dashboard';

  constructor(
    private router: Router,
    public authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.token) {
      this.authService.criarSessao(this.tokenService.token);
    }

    this.authService.autentidado$.subscribe(autenticado => {
      if (autenticado) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
