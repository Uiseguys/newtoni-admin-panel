import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";

import { SettingsService } from "../../../services/settings/settings.service";
import { PublicationsService } from "../../../pages/publications/publications.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  type = "";

  publications: any;
  error = "";
  validUrl = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: PublicationsService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      this.publications = res;
    });
  }

  deletePublication(publication) {
    if (!confirm("Are you sure to delete")) {
      return;
    }

    this.api.deletePublication(publication.id).subscribe(
      res => {
        this.publications = this.publications.filter(
          item => item.id != publication.id
        );
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
