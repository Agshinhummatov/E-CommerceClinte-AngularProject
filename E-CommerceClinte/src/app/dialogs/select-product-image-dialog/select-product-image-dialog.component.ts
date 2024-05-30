import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { List_Product_Image } from '../../contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',

  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.css'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {


  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef);

  }






  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Drag or select images to upload",
    isAdminPage: true,
    queryString: `id=${this.data}`,
  }

  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.ballAtom);
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerType.ballAtom));
  }

  async deleteImage(imageId: string, event: any) {

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.ballAtom)
        await this.productService.deleteImage(this.data as string, imageId, () => {
          this.spinner.hide(SpinnerType.ballAtom);
          var card = $(event.srcElement).closest('.product-image-card');
          card.fadeOut(500, () => {
            card.remove(); // Kartı DOM'dan kaldır
          });
        });
      }
    })
  }


  showCase(imageId: string) {
    this.spinner.show(SpinnerType.ballAtom);

    this.productService.changeShowcaseImage(imageId, this.data as string, () => {
      this.spinner.hide(SpinnerType.ballAtom);
    });
  }

}


export enum SelectProductImageState {
  Close
}

