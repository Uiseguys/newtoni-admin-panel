/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from "@angular/core";

import { Api } from "../../services/api/api.service";

@Injectable()
export class PublicationsService {
  constructor(private api: Api) {}

  // ---------- product api ----------
  getPublicationsCount(type) {
    const filter = {
      type
    };

    return this.api.get(`/publications/count?where=${JSON.stringify(filter)}`);
  }

  getAll() {
    const filter = {
      order: "id DESC"
    };
    return this.api.get(`/publications?filter=${JSON.stringify(filter)}`);
  }

  getPublications(date) {
    const filter = {
      order: "priority ASC",
      where: {
        date
      }
    };
    return this.api.get(`/publications?filter=${JSON.stringify(filter)}`);
  }

  searchPublications(key) {
    const filter = {
      where: {
        name: { like: `${encodeURIComponent(key)}%25` }
      },
      order: ["priority ASC"]
    };
    return this.api.get(`/publications?filter=${JSON.stringify(filter)}`);
  }

  createPublication(info) {
    return this.api.post("/publications", info);
  }

  updatePublication(id, info) {
    return this.api.patch(`/publications/${id}`, info);
  }

  getPublication(id) {
    const filter = {
      include: ["packaging"]
    };
    return this.api.get(`/publications/${id}`);
  }

  getImage(id) {
    return this.api.get(`/storage/file/${id}`);
  }

  deletePublication(id) {
    return this.api.delete(`/publications/${id}`);
  }
}
