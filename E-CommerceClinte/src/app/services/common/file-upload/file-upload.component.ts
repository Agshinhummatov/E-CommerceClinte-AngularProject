import { Component, Input } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';


@Component({
  selector: 'app-file-upload',

  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  
  constructor(
    private httpClientService: HttpClientService,
    private alertfiyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog
    ){
  }

  public files: NgxFileDropEntry[];

  @Input() options : Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
  
    const fileData : FormData = new FormData();

    for (const file of files) {
     (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
      
       fileData.append(_file.name, _file, file.relativePath);

     });
      
    }

    this.httpClientService.post({

      controller : this.options.controller,
      action : this.options.action,
      queryString : this.options.queryString,
    
      headers : new HttpHeaders({"responseType" : "blob"})
    }, fileData).subscribe(data =>{

      const message ="Files uploaded successfully."
      if(this.options.isAdminPage){
        this.alertfiyService.message(message,{
          dismissOthers : true,
          messageType : MessageType.Success,
          position : Position.TopRight
        })
      }else{
        this.customToastrService.message(message, "Successful",{
          messageType : ToastrMessageType.Success,
             position : ToastrPosition.TopRight
        })
      }
    },(errorReponse : HttpErrorResponse) =>{

      const message ="An unexpected error was encountered while uploading files"
      if(this.options.isAdminPage){
        this.alertfiyService.message(message,{
          dismissOthers : true,
          messageType : MessageType.Error,
          position : Position.TopRight
        })
      }else{
        this.customToastrService.message(message, "Unsuccessful",{
          messageType : ToastrMessageType.Error,
             position : ToastrPosition.TopRight
        })
      }
    })


  }
  
  
  openDialog(affterClosed: any): void {

    const dialogRef = this.dialog.open(FileUploadComponent, {
      data: FileUploadDialogState.yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === FileUploadDialogState.yes)
        affterClosed();
    });
  }
  

}



export class FileUploadOptions{

  controller? : string;
  action? : string;
  queryString? : string;
  explanation? : string;
  accept? : string;
  isAdminPage? : boolean = false;
  
 }
