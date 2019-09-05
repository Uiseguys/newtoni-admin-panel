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
    if (parseInt(values.availability)) {
      values.availability = true;
    } else {
      values.availability = false;
    }
    if (values.content) {
      values.content = 1;
    } else {
      values.content = 0;
    }
    if (!values.description) {
      values.description = "";
    }
    if (!values.no) {
      values.no = 0;
    }
    const success = () => {
      this.toasterService.popAsync(
        "success",
        "",
        "Publication has been created"
      );
    };

    this.api.createNews(values).subscribe(
      res => {
        success();
        this.router.navigate(["/dashboard/publications"]);
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
