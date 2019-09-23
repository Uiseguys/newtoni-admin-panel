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

  getImages(folder, page = 1, pageSize = 500) {
    const filter = {
      skip: page > 0 ? (page - 1) * pageSize : 0,
      limit: pageSize
    };
    return this.api.get(`/storage/tmp?filter=${JSON.stringify(filter)}`);
  }

  getAllImages() {
    // Making requests for each image folder and sending them
    let arr = this.api.get(`/storage/news-images`);
    arr.concat(this.api.get(`/storage/editions-images`));
    return arr.concat(this.api.get(`/storage/publications-images`));
  }

  deleteImage(id) {
    return this.api.delete(`/storage/delete/${id}`);
  }
}
