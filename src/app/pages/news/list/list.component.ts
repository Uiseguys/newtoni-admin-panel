import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";

import { SettingsService } from "../../../services/settings/settings.service";
import { NewsService } from "../../../pages/news/news.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  news: any;
  error = "";

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: NewsService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      this.news = res;
    });
  }

  deleteNews(news) {
    if (!confirm("Are you sure to delete")) {
      return;
    }

    this.api.deleteNews(news.id).subscribe(
      res => {
        this.news = this.news.filter(item => item.id != news.id);
      },
      res => {
        const error = JSON.parse(res._body);
        this.error =
          (error.error && error.error.message) || "Sorry, something is wrong";
      }
    );
  }

  getRoleName(role) {
    return role.map(item => item.name).join(",");
  }
}
