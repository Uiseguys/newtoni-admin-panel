import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from "angular2-toaster";

import { SettingsService } from "../../services/settings/settings.service";
import { ClientApiService } from "../../services/api/clientapi.service";
import { GoTrueJs } from "../../services/netlify/gotrue-js.service";

declare const Buffer;

@Component({
  selector: "app-login-page",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  inviteToken;
  recoveryToken;
  submitButton = 1;
  requestPassword;
  requestPasswordSuccess;
  loginForm: FormGroup;
  passwordForm: FormGroup;
  requestPasswordForm: FormGroup;
  formErr = 0;
  toasterconfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: false,
    timeout: 2000
  });

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private api: ClientApiService,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private gotrue: GoTrueJs
  ) {
    this.loginForm = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required])],
      remember: [0]
    });
    this.passwordForm = fb.group({
      password: ["", Validators.compose([Validators.required])]
    });
    this.requestPasswordForm = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit() {
    // Check to see if the URL contains a recovery or invitation token
    this.activeRoute.fragment.subscribe(fragment => {
      if (fragment) {
        if (/invite_token/.test(fragment)) {
          this.inviteToken = fragment.replace(/invite_token\=/, "");
        }
        if (/recovery_token/.test(fragment)) {
          let tmp = fragment.replace(/recovery_token\=/, "");
          this.gotrue
            .recoverPassword$(tmp)
            .subscribe(() => (this.recoveryToken = tmp));
        }
      }
    });
  }

  login($event) {
    $event.preventDefault();
    this.submitButton = 0;
    if (this.formErr) {
      this.formErr = 0;
    }
    for (let c in this.loginForm.controls) {
      this.loginForm.controls[c].markAsTouched();
    }
    if (!this.loginForm.valid) return;
    this.gotrue.login$(this.loginForm.value).subscribe(
      () => this.router.navigate(["/dashboard"]),
      () => {
        this.formErr = 1;
        this.submitButton = 1;
      }
    );
  }

  acceptInvite($event) {
    $event.preventDefault();
    this.submitButton = 0;
    if (this.formErr) {
      this.formErr = 0;
    }
    for (let c in this.passwordForm.controls) {
      this.passwordForm.controls[c].markAsTouched();
    }
    if (!this.passwordForm.valid) return;
    this.gotrue
      .acceptInvite$(this.inviteToken, this.passwordForm.value.password)
      .subscribe(
        () => this.router.navigate(["/dashboard"]),
        () => {
          this.formErr = 1;
          this.submitButton = 1;
        }
      );
  }

  requestPasswordRecovery($event) {
    $event.preventDefault();
    this.submitButton = 0;
    if (this.formErr) {
      this.formErr = 0;
    }
    for (let c in this.requestPasswordForm.controls) {
      this.requestPasswordForm.controls[c].markAsTouched();
    }
    if (!this.requestPasswordForm.valid) return;
    this.gotrue
      .requestPasswordRecovery$(this.requestPasswordForm.value.email)
      .subscribe(
        () => (this.requestPasswordSuccess = 1),
        () => {
          this.formErr = 1;
          this.submitButton = 1;
        }
      );
  }

  openForgotPassword() {
    this.requestPassword = 1;
    this.requestPasswordSuccess = 0;
    this.submitButton = 1;
  }

  closeForgotPassword() {
    this.requestPassword = 0;
    this.requestPasswordSuccess = 0;
    this.submitButton = 1;
  }

  updatePassword($event) {
    $event.preventDefault();
    this.submitButton = 0;
    if (this.formErr) {
      this.formErr = 0;
    }
    for (let c in this.passwordForm.controls) {
      this.passwordForm.controls[c].markAsTouched();
    }
    if (!this.passwordForm.valid) return;
    this.gotrue.updatePassword$(this.passwordForm.value.password).subscribe(
      () => this.router.navigate(["/dashboard"]),
      () => {
        this.formErr = 1;
        this.submitButton = 1;
      }
    );
  }
}
