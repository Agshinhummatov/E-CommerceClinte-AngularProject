import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { RoleService } from '../../services/common/models/role.service';
import { List_Role } from '../../contracts/role/List_Role';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from '../../services/common/models/authorization-endpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrl: './authorize-menu-dialog.component.css'
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent>  implements OnInit {
  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private rolesService : RoleService,
    private authorizationEndpointService: AuthorizationEndpointService, private spinner: NgxSpinnerService) {
    super(dialogRef)
  }

  roles: { datas: List_Role[], totalCount: number};

  async ngOnInit(){
   
    this.roles = await this.rolesService.getRoles(-1,-1);
  }

  
  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o.value);
    
    this.spinner.show(SpinnerType.ballAtom);
    this.authorizationEndpointService.assignRoleEndpoint(roles, this.data.code, this.data.menuName,
      () => {
        this.spinner.hide(SpinnerType.ballAtom);
      }, error => {

      })
      
  }

  
}

export enum AuthorizeMenuState {
  Yes,
  No
}