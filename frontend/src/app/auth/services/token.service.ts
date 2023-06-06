import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { KeyConstants } from 'src/app/shared/data/constants/key-constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public tokenChangesObs = this.tokenSbj.asObservable();

  constructor() { }

  public saveToken(token: string) {
    this.tokenSbj.next(true);
    localStorage.setItem(KeyConstants.ACCES_TOKEN, token);
  }

  public getToken() {
    return localStorage.getItem(KeyConstants.ACCES_TOKEN);
  }

  public removeToken() {
    this.tokenSbj.next(false);
    localStorage.removeItem(KeyConstants.ACCES_TOKEN);
  }
}
