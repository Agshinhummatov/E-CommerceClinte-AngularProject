import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { Create_Users } from '../../../contracts/users/create_users';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner)
  }



  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({

      nameSurname: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
      password: ["", [Validators.required]],
      passwordConfirm: ["", [Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordConfirm = group.get("passwordConfirm").value;
        return password === passwordConfirm ? null : { notSame: true };
      }
    })

  }

  get componet() {
    return this.frm.controls;
  }

  submitted: boolean = true;

  async onSubmit(user: User) {
    this.submitted = true;
    if (this.frm.invalid)
      return;

    const result: Create_Users = await this.userService.create(user);
    if (result.succeeded)
      this.toastrService.message(result.message, "User registration successful",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    else
      this.toastrService.message(result.message, "user registration failed",{
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });


  }
}
