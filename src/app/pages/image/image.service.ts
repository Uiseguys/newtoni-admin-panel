/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from "@angular/core";

import { Api } from "../../services/api/api.service";
import { SettingsService } from "../../services/settings/settings.service";

@Injectable()
export class ImageService {
  constructor(private api: Api, private settings: SettingsService) {}

  // ---------- product api ----------
  getImageCount() {
    const filter = {};
    return this.api.get("/storage/images/tmp");
  }

  getImages(folder: string, page = 1, pageSize = 500) {
    const filter = {
      skip: page > 0 ? (page - 1) * pageSize : 0,
      limit: pageSize
    };
    return this.api.get(`/storage/${folder}?filter=${JSON.stringify(filter)}`);
  }

  getAllImages(page = 1, pageSize = 500) {
    const filter = {
      skip: page > 0 ? (page - 1) * pageSize : 0,
      limit: pageSize
    };
    return this.api.get(`/storage/all?filter=${JSON.stringify(filter)}`);
  }

  deleteImage(id) {
    return this.api.delete(`/storage/delete/${id}`);
  }
}
