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
      order: ["type", "priority ASC"]
    };
    return this.api.get(`/publications?filter=${JSON.stringify(filter)}`);
  }

  getPublications(type) {
    const filter = {
      order: "priority ASC",
      where: {
        type
      }
    };
    return this.api.get(`/publications?filter=${JSON.stringify(filter)}`);
  }

  searchPublications(type, key) {
    const filter = {
      where: {
        name: { like: `${encodeURIComponent(key)}%25` },
        type
      },
      order: ["priority ASC"]
    };
    return this.api.get(`/publications?filter=${JSON.stringify(filter)}`);
  }

  createPublications(info) {
    console.log(info);
    return this.api.post("/publications", info);
  }

  updatePublications(id, info) {
    return this.api.patch(`/publications/${id}`, info);
  }

  getPublication(id) {
    const filter = {
      include: ["packaging"]
    };
    return this.api.get(`/publications/${id}`);
  }

  deletePublications(id) {
    return this.api.delete(`/publications/${id}`);
  }
}
