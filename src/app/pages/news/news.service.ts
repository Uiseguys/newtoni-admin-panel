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

    return this.api.get(`/news/count?where=${JSON.stringify(filter)}`);
  }

  getAll() {
    const filter = {
      order: "id DESC"
    };
    return this.api.get(`/news?filter=${JSON.stringify(filter)}`);
  }

  getNewss(date) {
    const filter = {
      order: "priority ASC",
      where: {
        date
      }
    };
    return this.api.get(`/news?filter=${JSON.stringify(filter)}`);
  }

  searchNews(key) {
    const filter = {
      where: {
        name: { like: `${encodeURIComponent(key)}%25` }
      },
      order: ["priority ASC"]
    };
    return this.api.get(`/news?filter=${JSON.stringify(filter)}`);
  }

  createNews(info) {
    return this.api.post("/news", info);
  }

  updateNews(id, info) {
    return this.api.patch(`/news/${id}`, info);
  }

  getNews(id) {
    return this.api.get(`/news/${id}`);
  }

  deleteNews(id) {
    return this.api.delete(`/news/${id}`);
  }
}
