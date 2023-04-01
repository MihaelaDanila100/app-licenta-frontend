import { Injectable } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private matIcons: MatIconRegistry, private domSanitizer: DomSanitizer) { 
    this.useUnlockIcon();
    this.useLockIcon();
  }

  public useUnlockIcon(): void {
    this.matIcons.addSvgIcon('unlock_icon', 
    this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/unlock_icon.svg'))
  }

  public useLockIcon(): void {
    this.matIcons.addSvgIcon('lock_icon', 
    this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/lock_icon.svg'))
  }
}
