import { Injectable } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private matIcons: MatIconRegistry, private domSanitizer: DomSanitizer) { 
    this.useLockIcon();
    this.usePalleteIcon();
    this.usecolorizeIcons();
  }

  public useLockIcon(): void {
    this.matIcons.addSvgIcon(
      'lock_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/lock_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'unlock_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/unlock_icon.svg')
    );
  }

  public usePalleteIcon(): void {
    this.matIcons.addSvgIcon(
      'pallette_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/pallette_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'full_pallete_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/pallete_on_icon.svg')
    );
  }

  public usecolorizeIcons(): void {
    this.matIcons.addSvgIcon(
      'fill_color_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/fill_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'outline_color_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/outline_icon.svg')
    );
  }

}
