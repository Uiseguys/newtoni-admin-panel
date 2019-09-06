import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";

import { SettingsService } from "../../../services/settings/settings.service";
import { EditionsService } from "../../../pages/editions/editions.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  validUrl = true;
  editions: any;
  error = "";

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: EditionsService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      this.editions = res;
    });
  }

  deleteEdition(edition) {
    if (!confirm("Are you sure to delete")) {
      return;
    }

    this.api.deleteEdition(edition.id).subscribe(
      res => {
        this.editions = this.editions.filter(item => item.id != edition.id);
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
