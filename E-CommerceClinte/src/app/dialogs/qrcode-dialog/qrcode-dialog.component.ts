import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDetailDialogState } from '../order-detail-dialog/order-detail-dialog.component';
import { OrderService } from '../../services/common/models/order.service';
import { DialogService } from '../../services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService } from '../../services/ui/custom-toastr.service';
import { QrCodeService } from '../../services/common/qr-code.service';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { SpinnerType } from '../../base/base.component';


@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrl: './qrcode-dialog.component.css'
})


export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit  {

  constructor(
    dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  string,
    private spinner: NgxSpinnerService,
    private qrCodeService: QrCodeService,
    private domSanitizer : DomSanitizer) {
    super(dialogRef)
  }

  qrCodeSafeUrl : SafeUrl;
  async ngOnInit() {
    this.spinner.show(SpinnerType.ballAtom)
   const qrCodeBlob : Blob = await this.qrCodeService.generateQRCode(this.data)
    const url: string = URL.createObjectURL(qrCodeBlob)
   this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url)
   this.spinner.hide(SpinnerType.ballAtom)
  }

}
