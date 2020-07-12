import { Component, Input } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() titulo: string;
  constructor(private authService: AuthService, private toastr: ToastrService) { }

  logout(): void {
    this.authService.deslogar().subscribe(() => {
      this.toastr.success('Saindo!\nVolte logo...', 'Sucesso');
    });
  }
}
