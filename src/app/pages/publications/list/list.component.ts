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
      this.publications = res.map((item, index) => {
        // Parse through string file sent from
        item.image = JSON.parse(item.image);
        if (item.image.length > 0) {
          item.image = item.image[0].url
        } else {
          item.image = []
        }
        return item;
      });
    });
  }

  deletePublication(id) {
    if (!confirm("Are you sure to delete")) {
      return;
    }

    this.api.deletePublication(id).subscribe(
      res => {
        this.publications = this.publications.filter(
          item => item.id != id
        );
      },
      res => {
        const error = JSON.parse(res._body);
        this.error =
          (error.error && error.error.message) || "Sorry, something is wrong";
      }
    );
  }

  getImageUrl(url) {
    if (url) {
      return `${this.settings.API_URL}${url}`;
    }
    return "-";
  }

  getRoleName(role) {
    return role.map(item => item.name).join(",");
  }
}
