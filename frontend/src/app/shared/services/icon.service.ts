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
    this.useMainActions();
    this.teacherActions();
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
    this.matIcons.addSvgIcon(
      'brush_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/brush_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'brush_fill_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/brush_fill_icon.svg')
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
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/add_edge_icon_off.svg')
    );

  }

  public useMainActions(): void {
    this.matIcons.addSvgIcon(
      'export_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/export_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'import_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/import_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'add_whiteboard_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/add_whiteboard_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'save_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/save_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'login', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/login.svg')
    );
  }

  public teacherActions(): void {
    this.matIcons.addSvgIcon(
      'whiteboard', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/whiteboard_new_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'old_pictures', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/whiteboard_icon.svg')
    );
    this.matIcons.addSvgIcon(
      'check_success', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/check_success.svg')
    );
    this.matIcons.addSvgIcon(
      'add_students', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/add_students.svg')
    );
    this.matIcons.addSvgIcon(
      'add_group', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/add_group.svg')
    );
    this.matIcons.addSvgIcon(
      'classrooms', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/classrooms.svg')
    );
    this.matIcons.addSvgIcon(
      'dashboard_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/dashboard_icon.svg')
    );
  }

}
