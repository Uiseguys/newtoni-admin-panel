/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from "@angular/core";

import { Api } from "../../services/api/api.service";

@Injectable()
export class EditionsService {
  constructor(private api: Api) {}

  // ---------- product api ----------
  getEditionsCount(type) {
    const filter = {
      type
    };

    return this.api.get(`/editions/count?where=${JSON.stringify(filter)}`);
  }

  getAll() {
    const filter = {
      order: ["date", "priority ASC"]
    };
    return this.api.get(`/editions?filter=${JSON.stringify(filter)}`);
  }

  getEditions(date) {
    const filter = {
      order: "priority ASC",
      where: {
        date
      }
    };
    return this.api.get(`/editions?filter=${JSON.stringify(filter)}`);
  }

  searchEditions(key) {
    const filter = {
      where: {
        name: { like: `${encodeURIComponent(key)}%25` }
      },
      order: ["priority ASC"]
    };
    return this.api.get(`/editions?filter=${JSON.stringify(filter)}`);
  }

  createEdition(info) {
    return this.api.post("/editions", info);
  }

  updateEdition(id, info) {
    return this.api.patch(`/editions/${id}`, info);
  }

  getEdition(id) {
    const filter = {
      include: ["packaging"]
    };
    return this.api.get(`/editions/${id}`);
  }

  deleteEdition(id) {
    return this.api.delete(`/editions/${id}`);
  }
}
