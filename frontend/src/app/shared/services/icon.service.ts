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
    this.useColorizeIcons();
    this.useMeasurementIcons();
    this.useActionsIcons();
    this.useIconsService();
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

  public useColorizeIcons(): void {
    this.matIcons.addSvgIcon(
      'fill_color_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/fill_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'outline_color_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/outline_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'text_color_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/text_color_icon.svg')
    );
  }

  public useMeasurementIcons(): void {
    this.matIcons.addSvgIcon(
      'shape_settings_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/shape_settings.svg')
    );
  }

  public useActionsIcons(): void {
    this.matIcons.addSvgIcon(
      'duplicate_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/duplicate_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'delete_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/delete_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'rotate_right_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/rotate_right_icon.svg')
    );
  }

  public useIconsService(): void {
    this.matIcons.addSvgIcon(
      'add_text_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/add_text_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'add_node_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/add_node_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'add_edge_icon_on', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/add_edge_icon_on.svg')
    );
    this.matIcons.addSvgIcon(
      'add_edge_icon_off', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/add_edge_icon_on.svg')
    );

  }

}
