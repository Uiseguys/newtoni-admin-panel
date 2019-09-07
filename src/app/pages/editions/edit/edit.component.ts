import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService } from "angular2-toaster";

import { EditionsService } from "../editions.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
  error = "";
  edition: any = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toasterService: ToasterService,
    private api: EditionsService
  ) {
    this.route.params.subscribe(params => {
      this.api.getEdition(params.id).subscribe(res => {
        this.edition = res;
      });
    });
  }

  ngOnInit() {}

  handleSubmit(values) {
    this.api.updateEdition(this.edition.id, values).subscribe(
      res => {
        this.toasterService.popAsync(
          "success",
          "",
          "Publication has been updated"
        );
        this.router.navigate(["/dashboard/editions"]);
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

