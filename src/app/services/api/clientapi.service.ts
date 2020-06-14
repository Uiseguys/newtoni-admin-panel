/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/throw';
import { Api } from "./api.service";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment as ENV } from "../../../environments/environment";

@Injectable()
export class ClientApiService extends Api {
  private transactionObserver = new Subject();
  private transactionRefresher;

  // ---------- auth api ----------
  login(info): Observable<any> {
    return this.post("/custom-users/login", info);
  }

  register(info): Observable<any> {
    return this.post("/custom-users", info);
  }

  logout(): Observable<any> {
    return this.post("/custom-users/logout", {});
  }

  getUserInfo(id): Observable<any> {
    const filter = {
      include: ["roles"]
    };

    return this.get(`/custom-users/${id}?filter=${JSON.stringify(filter)}`);
  }

  generatePDF(template, data): Observable<any> {
    return this.http
      .post(`${ENV.pdfUrl}?template=${encodeURIComponent(template)}`, data, {})
      .pipe(map(res => `${ENV.pdfUrl}/${res}`));
  }
}
