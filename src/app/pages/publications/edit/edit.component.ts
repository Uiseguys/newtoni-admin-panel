import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService } from "angular2-toaster";

import { PublicationsService } from "../publications.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  error = "";
  publication: any = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toasterService: ToasterService,
    private api: PublicationsService
  ) {
    this.route.params.subscribe(params => {
      this.api.getPublication(params.id).subscribe(res => {
        this.publication = res;
      });
    });
  }

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
    const d = new Date();
    values.update_time = d.toISOString();
    this.api.updatePublication(this.publication.id, values).subscribe(
      res => {
        this.toasterService.popAsync(
          "success",
          "",
          "Publication has been updated"
        );
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
  }
}
