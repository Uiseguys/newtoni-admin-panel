/**
 * Created by Tall Prince on 5/26/2017.
 */
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment as ENV } from "../../../environments/environment";
import { SettingsService } from "../settings/settings.service";

@Injectable()
export class Api {
  public apiUrl = ENV.apiUrl;

  constructor(
    public http: HttpClient,
    private router: Router,
    protected settings: SettingsService
  ) {}

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append(
      "Authorization",
      "Basic " + this.settings.getStorage("token")
    );
  }

  get(url, data?): Observable<any> {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);

    let params: HttpParams = new HttpParams();
    if (data) {
      for (const key in data) {
        params = params.append(key, data[key]);
      }
    }

    return this.http
      .get(this.apiUrl + url, {
        headers: headers,
        params: params
      })
      .pipe(catchError(this.handleError));
  }

  post(url, data): Observable<any> {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    headers.append("withCredentials", "false");

    return this.http
      .post(this.apiUrl + url, data, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  put(url, data): Observable<any> {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);

    return this.http
      .put(this.apiUrl + url, data, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  patch(url, data): Observable<any> {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);

    return this.http
      .patch(this.apiUrl + url, data, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  delete(url): Observable<any> {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);

    return this.http
      .delete(this.apiUrl + url, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: any) {
    if (error.status == 401 && error.url && !error.url.endsWith("/login")) {
      if (this.settings) {
        this.settings.clearSetting();
      }
      document.location.href = "/";
    }

    if (error.error instanceof ErrorEvent) {
      // A client side or network error occurred. Handle it accordingly
      console.error("An error occurred:", JSON.stringify(error.error));
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${JSON.stringify(
          error.error
        )}`
      );
    }

    return throwError("Something went wrong, please try again later");
  }
}
