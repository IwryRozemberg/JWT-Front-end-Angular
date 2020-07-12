import { Injectable } from '@angular/core';

import { TOKEN_STORAGE } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public get token(): string {
    return localStorage.getItem(TOKEN_STORAGE);
  }

  public set token(token: string) {
    localStorage.setItem(TOKEN_STORAGE, token);
  }

  public resetToken(): void {
    localStorage.removeItem(TOKEN_STORAGE);
  }
}
