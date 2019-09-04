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
        this.api.getPublications(params.type).subscribe(res => {
          this.publications = res;
          console.log("This is the response " + res);
        });
      }
    });
  }

  deletePublication(publication) {
    if (!confirm("Are you sure to delete")) {
      return;
    }

    this.api.deletePublications(publication.id).subscribe(
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
