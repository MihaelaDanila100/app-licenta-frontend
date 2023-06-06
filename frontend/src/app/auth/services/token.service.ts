import { Injectable } from '@angular/core';
import { KeyConstants } from 'src/app/shared/data/constants/key-constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public saveToken(token: string) {
    localStorage.setItem(KeyConstants.ACCES_TOKEN, token);
  }

  public getToken() {
    return localStorage.getItem(KeyConstants.ACCES_TOKEN);
  }

  public removeToken() {
    localStorage.removeItem(KeyConstants.ACCES_TOKEN);
  }
}
