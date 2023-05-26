import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private exportFileSbj: Subject<any> = new Subject<any>();
  public exportFileObs = this.exportFileSbj.asObservable();
  private filesSbj: Subject<any> = new Subject<any>();
  public filesObs = this.filesSbj.asObservable();

  constructor() { }

  public updateExportFile(fileMode: string) {
    this.exportFileSbj.next(fileMode);
  }

  public updateImportedFile(file: any) {
    this.filesSbj.next(file);
  }
}
