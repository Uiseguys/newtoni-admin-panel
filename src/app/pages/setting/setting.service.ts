/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';

import { Api } from '../../services/api/api.service';

@Injectable()
export class SettingService {
  constructor(private api: Api) {}

  getAll() {
    return this.api.get('/Settings');
  }

  getSetting(key) {
    const filter = {
      where: { key }
    };
    return this.api.get(`/Settings?filter=${JSON.stringify(filter)}`);
  }

  deleteSetting(id) {
    return this.api.delete(`/Settings/${id}`);
  }

  updateSetting(key, value) {
    const where = { key };
    return this.api.post(
      `/Settings/upsertWithWhere?where=${JSON.stringify(where)}`,
      { key, value }
    );
  }
}
