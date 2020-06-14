import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import GoTrue from "gotrue-js";
import { from, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class GoTrueJs {
  private auth;
  constructor() {
    this.auth = new GoTrue({
      APIUrl: "https://newtoni-admin-panel.netlify.app/.netlify/identity",
      audience: "",
      setCookie: true
    });
  }

  currentUser = () => this.auth.currentUser();

  acceptInvite$ = (token, password) =>
    from(this.auth.acceptInvite(token, password, true)).pipe(
      catchError(this.handleError)
    );

  login$ = formValue =>
    from(
      this.auth.login(formValue.email, formValue.password, formValue.remember)
    ).pipe(catchError(this.handleError));

  logout$ = () =>
    from(this.auth.currentUser().logout()).pipe(catchError(this.handleError));

  requestPasswordRecovery$ = email =>
    from(this.auth.requestPasswordRecovery(email)).pipe(
      catchError(this.handleError)
    );

  recoverPassword$ = token =>
    from(this.auth.recover(token)).pipe(catchError(this.handleError));

  updatePassword$ = updatePassword =>
    from(this.auth.currentUser().update({ password: updatePassword })).pipe(
      catchError(this.handleError)
    );

  protected handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client side or network error occurred. Handle it accordingly
      console.log("An error occurred: ", error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${JSON.stringify(
          error.error
        )}`
      );
    }
    return throwError("Something went wrong, please try again later");
  };
}
