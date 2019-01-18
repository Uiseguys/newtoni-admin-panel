/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Api } from './api.service';
import { Observable, Subject } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';

@Injectable()
export class ClientApiService extends Api {
  private transactionObserver = new Subject();
  private transactionRefresher;

  // ---------- auth api ----------
  login(info) {
    return this.post('/CustomUsers/login', info);
  }

  register(info) {
    return this.post('/CustomUsers', info);
  }

  logout() {
    return this.post('/CustomUsers/logout', {});
  }

  getUserInfo(id) {
    const filter = {
      include: ['roles']
    };

    return this.get(`/CustomUsers/${id}?filter=${JSON.stringify(filter)}`);
  }

  generatePDF(template, data) {
    return this.http
      .post(`${ENV.pdfUrl}?template=${encodeURIComponent(template)}`, data, {})
      .map((res: any) => `${ENV.pdfUrl}/${res._body}`);
  }
}
