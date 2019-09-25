import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";

import { NewsService } from "../news.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  constructor(
    public router: Router,
    private toasterService: ToasterService,
    private api: NewsService
  ) {}

  ngOnInit() {}

  handleSubmit = values => {
    this.api.createNews(values).subscribe(
      res => {
        this.toasterService.popAsync(
          "success",
          "",
          "News post has been created"
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
  };
}
