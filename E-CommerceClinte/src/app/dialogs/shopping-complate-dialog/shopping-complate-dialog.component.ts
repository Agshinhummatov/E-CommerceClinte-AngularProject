import { Component, Inject, OnDestroy } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare var $: any;
@Component({
  selector: 'app-shopping-complate-dialog',

  templateUrl: './shopping-complate-dialog.component.html',
  styleUrl: './shopping-complate-dialog.component.css'
})
export class ShoppingComplateDialogComponent extends BaseDialog<ShoppingComplateDialogComponent> implements OnDestroy{

  
  constructor(dialogRef: MatDialogRef<ShoppingComplateDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: ShoppingComplateState) {
    super(dialogRef);
    
  }

  show: boolean = false;
  complate(){
    this.show = true;
  }

  ngOnDestroy(): void {
    if (!this.show )
      $("#basketModal").modal("show")
  
   
  }

 

}


export enum ShoppingComplateState {

  Yes,
  No

} 