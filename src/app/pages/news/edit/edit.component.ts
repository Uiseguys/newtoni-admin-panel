import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService } from "angular2-toaster";

import { NewsService } from "../news.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
  error = "";
  news: any = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toasterService: ToasterService,
    private api: NewsService
  ) {
    this.route.params.subscribe(params => {
      this.api.getNews(params.id).subscribe(res => {
        this.news = res;
      });
    });
  }

  ngOnInit() {}

  handleSubmit(values) {
    const d = new Date();
    values.update_time = d.toISOString();
    this.api.updateNews(this.news.id, values).subscribe(
      res => {
        this.toasterService.popAsync(
          "success",
          "",
          "Publication has been updated"
        );
        this.router.navigate(["/dashboard/news"]);
      },
      res => {
        const body = JSON.parse(res._body);
        this.toasterService.popAsync(
          "error",
          "",
          (body.error && body.error.message) || "Sorry, something went wrong"
        );
      }
    );
  }
}
