import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";

import { PublicationsService } from "../publications.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  constructor(
    public router: Router,
    private toasterService: ToasterService,
    private api: PublicationsService
  ) {}

  ngOnInit() {}

  handleSubmit(values) {
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
    console.log("These are the values " + JSON.stringify(values));
    this.api.createPublications(values).subscribe(
      res => {
        console.log("This is the positive response so far " + res);
        this.toasterService.popAsync("success", "", "Product has been created");
        this.router.navigate(["/dashboard/publications"]);
      },
      res => {
        console.log("This is the negative response so far " + res);
        const body = JSON.parse(res._body);
        this.toasterService.popAsync(
          "error",
          "",
          (body.error && body.error.message) || "Sorry, something is wrong"
        );
      }
    );
  }
}
