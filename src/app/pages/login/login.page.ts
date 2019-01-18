import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

import { SettingsService } from '../../services/settings/settings.service';
import { ClientApiService } from '../../services/api/clientapi.service';

declare const Buffer

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';
  toasterconfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: false,
    timeout: 2000
  });

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private api: ClientApiService,
    private toasterService: ToasterService,
    private settings: SettingsService
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });

    this.loginForm.controls['email'].setValue('admin@admin.com');
    this.loginForm.controls['password'].setValue('admin123');

    if (this.settings.getStorage('token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {}

  login($event) {
    $event.preventDefault();

    for (let c in this.loginForm.controls) {
      this.loginForm.controls[c].markAsTouched();
    }
    if (!this.loginForm.valid) return;

    this.api.login(this.loginForm.value).subscribe(
      res => {
        var base64encodedData = new Buffer(this.loginForm.value.email + ':' + this.loginForm.value.password).toString('base64');
        this.settings.setStorage('token', base64encodedData);
        this.settings.setStorage('userId', res.id);
        this.router.navigate(['/dashboard']);
      },
      res => {
        const body = JSON.parse(res._body);
        this.toasterService.popAsync(
          'error',
          '',
          (body.error && body.error.message) ||
            ' Email or Password is incorrect'
        );
      }
    );
  }
}
