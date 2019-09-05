/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from "@angular/core";

import { Api } from "../../services/api/api.service";

@Injectable()
export class NewsService {
  constructor(private api: Api) {}

  // ---------- product api ----------
  getNewsCount(type) {
    const filter = {
      type
    };

    return this.api.get(`/publications/count?where=${JSON.stringify(filter)}`);
  }

  getAll() {
    const filter = {
      order: ["date", "priority ASC"]
    };
    return this.api.get(`/publications?filter=${JSON.stringify(filter)}`);
  }

  getNews(date) {
    const filter = {
      order: "priority ASC",
      where: {
        date
      }
    };
    return this.api.get(`/publications?filter=${JSON.stringify(filter)}`);
  }

  searchNews(key) {
    const filter = {
      where: {
        name: { like: `${encodeURIComponent(key)}%25` }
      },
      order: ["priority ASC"]
    };
    return this.api.get(`/publications?filter=${JSON.stringify(filter)}`);
  }

  createNews(info) {
    return this.api.post("/publications", info);
  }

  updateNews(id, info) {
    return this.api.patch(`/publications/${id}`, info);
  }

  getNewss(id) {
    const filter = {
      include: ["packaging"]
    };
    return this.api.get(`/publications/${id}`);
  }

  deleteNews(id) {
    return this.api.delete(`/publications/${id}`);
  }
}
