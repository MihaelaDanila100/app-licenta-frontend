import { Injectable } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private matIcons: MatIconRegistry, private domSanitizer: DomSanitizer) { 
    this.useLockIcon();
  }

  public useLockIcon(): void {
    this.matIcons.addSvgIcon('lock_icon', 
    this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/lock_icon.svg'))
  }
}
