import { Injectable } from "@angular/core";
import { FileService } from "../shared/services/file.service";
import { map } from "rxjs";
import { ShapeActionsService } from "../shared/services/shape-actions.service";

@Injectable({
    providedIn:'root'
})
export class FileHelper {

    constructor(private fileService: FileService,
        private shapeActionsService: ShapeActionsService) { }

    public killGraphObjReq = (obj: any) => {
        return this.fileService.destoryGraphRelatedObjects$.pipe(
            map(() => {
                this.shapeActionsService.destroyObject(obj);
            })
        );
    }

}