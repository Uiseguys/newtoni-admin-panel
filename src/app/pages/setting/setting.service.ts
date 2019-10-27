/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from "@angular/core";

import { Api } from "../../services/api/api.service";

@Injectable()
export class SettingService {
  constructor(private api: Api) {}

  getAll() {
    return this.api.get("/settings");
  }

  getCount() {
    return this.api.get("/settings/count");
  }
  
  getSetting(key) {
    const filter = {
      where: { key }
    };
    return this.api.get(`/settings?filter=${JSON.stringify(filter)}`);
  }

  deleteSetting(id) {
    return this.api.delete(`/settings/${id}`);
  }

  createSetting(key, value) {
    const where = { key };
    return this.api.post(`/settings?where=${JSON.stringify(where)}`, {
      key,
      value
    });
  }

  updateSetting(key, value) {
    const where = { key };
    return this.api.patch(`/settings?where=${JSON.stringify(where)}`, {
      key,
      value
    });
  }
}
