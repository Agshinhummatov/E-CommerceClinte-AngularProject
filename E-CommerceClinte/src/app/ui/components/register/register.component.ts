import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {


  }

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({

      nameAndSurname: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      userName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
      password: ["", [Validators.required]],
      checkPassword: ["", [Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let checkPassword = group.get("checkPassword").value;
        return password === checkPassword ? null : { notSame: true };
      }
    })

  }

  get componet() {
    return this.frm.controls;
  }

  submitted: boolean = true;

  onSubmit(data: any) {
    this.submitted = true;
    if (this.frm.invalid)
      return;

  }

}
