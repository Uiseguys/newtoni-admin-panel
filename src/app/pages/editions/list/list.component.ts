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
      this.editions = res.map((item, index) => {
        // Parse through string file sent from
        item["image"] = item["image"] ? JSON.parse(item.image) : [];
        return item;
      });
    });
  }

  deleteEdition(id) {
    if (!confirm("Are you sure to delete")) {
      return;
    }

    this.api.deleteEdition(id).subscribe(
      res => {
        this.editions = this.editions.filter(item => item.id != id);
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
