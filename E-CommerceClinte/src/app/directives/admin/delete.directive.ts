import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Directive({
  selector: '[appDelete]',

})

export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService
  ) {

    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);


  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")

  async onclick() {
    this.openDialog(async () => {

      this.spinner.show(SpinnerType.ballAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;
      // await this.productService.delete(this.id);

      await this.httpClientService.delete({
        controller: this.controller,

      }, this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toggle"
        }, 700, () => {
          this.callback.emit();
          this.alertifyService.message("Deleted successfully", {

            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight

          });

        });
      } , (errorResponse : HttpErrorResponse)=>{
        this.spinner.hide(SpinnerType.ballAtom);
        this.alertifyService.message("An error occurred when deleted...", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight

        });
      });
    });

  }


  openDialog(affterClosed: any): void {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === DeleteState.yes)
        affterClosed();

    });
  }

}
