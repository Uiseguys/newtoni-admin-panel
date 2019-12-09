import { Injectable } from "@angular/core";
import GoTrue from "gotrue-js";
import { fromPromise } from "rxjs/observable/fromPromise";

@Injectable()
export class GoTrueJs {
  auth;
  constructor() {
    this.auth = new GoTrue({
      APIUrl: "https://newtoni-admin-panel.netlify.com/.netlify/identity",
      audience: "",
      setCookie: true
    });
  }

  currentUser = () => {
    return this.auth.currentUser();
  };

  acceptInvite$ = (token, password) => {
    return fromPromise(this.auth.acceptInvite(token, password, true));
  };

  login$ = formValue => {
    return fromPromise(
      this.auth.login(formValue.email, formValue.password, formValue.remember)
    );
  };

  logout$ = () => {
    return fromPromise(this.auth.currentUser().logout());
  };

  requestPasswordRecovery$ = email => {
    return fromPromise(this.auth.requestPasswordRecovery(email));
  };

  recoverPassword$ = token => {
    return fromPromise(this.auth.recover(token));
  };

  updatePassword$ = updatePassword => {
    return fromPromise(
      this.auth.currentUser().update({ password: updatePassword })
    );
  };
}
