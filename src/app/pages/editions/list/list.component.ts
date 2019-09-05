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
  type = "";

  editions: any;
  error = "";
  validUrl = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: EditionsService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params.type.split("-").join(" ");
      let category = [
        { name: "Artist Books", link: "Artist-Books" },
        { name: "Magazine", link: "Magazine" },
        { name: "New Media", link: "New-Media" },
        { name: "Photography", link: "Photography" },
        { name: "Graphic", link: "Graphic" }
      ];

      let isValid = false;
      // Check for the valid Routes
      for (let i = 0; i < category.length; i++) {
        if (category[i].name == this.type) {
          isValid = true;
          break;
        }
      }
      if (isValid === false) {
        this.validUrl = false;
        // this.router.navigate(['/'])
      } else {
        this.validUrl = true;
        this.api.getAll().subscribe(res => {
          this.editions = res;
        });
      }
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
