/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';

import { Api } from '../../services/api/api.service';
import { SettingsService } from '../../services/settings/settings.service';

@Injectable()
export class ImageService {
  constructor(
    private api: Api,
    private settings: SettingsService,
  ) { }

  // ---------- product api ----------
  getImageCount() {
    const filter = {
    };

    return this.api.get(`/Resources/count?where=${JSON.stringify(filter)}`);
  }

  getImages(page = 1, pageSize = 500) {
    const filter = {
      skip: page > 0 ? (page - 1) * pageSize : 0,
      limit: pageSize
    };
    return this.api.get(`/Resources?filter=${JSON.stringify(filter)}`);
  }

  getAllImages() {
    return this.api.get(`/Resources`);
  }

  deleteImage(id) {
    return this.api.delete(`/Resources/${id}`);
  }
}
