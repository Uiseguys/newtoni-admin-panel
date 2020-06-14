import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { HttpClient } from "@angular/common/http";

import { SettingsService as ConfigService } from "../../services/settings/settings.service";
import { forkJoin, timer } from "rxjs";
import { catchError, map, flatMap, takeWhile } from "rxjs/operators";
import { ClientApiService } from "../../services/api/clientapi.service";
import { SettingService } from "../../pages/setting/setting.service";
import { GoTrueJs } from "../../services/netlify/gotrue-js.service";

declare let $: any;

@Component({
  selector: "app-dashboardlayout",
  templateUrl: "./dashboardlayout.component.html",
  styleUrls: ["./dashboardlayout.component.scss"]
})
export class DashboardLayoutComponent implements OnInit {
  toasterconfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: false,
    timeout: 2000
  });

  user: any;
  lang = "";
  timer: any = null;

  constructor(
    public http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private config: ConfigService,
    private api: ClientApiService,
    private settingApi: SettingService,
    private gotrue: GoTrueJs
  ) {
    this.user = this.gotrue.currentUser();
    this.lang = localStorage.getItem("stanapplang") || "de";
  }

  ngOnInit() {
    // this.toasterService.popAsync('error', '', 'asddddddd');
    this.settingApi.getAll().subscribe(res => {
      const item = res.find(settings => settings.key === "settings");
      const netlifyHook = res.find(settings => settings.key === "netlifyHook");
      this.config.setAppSetting("settings", item ? item.value : {});
      if (netlifyHook) {
        this.settingApi.deleteSetting(netlifyHook.id).subscribe(_ => null);
      }
    });
  }

  logout($event) {
    $event.preventDefault();
    this.gotrue.logout$().subscribe(() => this.router.navigate(["/login"]));
  }

  changeLanguage(lang) {
    this.lang = lang;
    localStorage.setItem("stanapplang", lang);
    document.location.reload();
  }

  triggerHook(isLive) {
    this.timer = true;
    const settings = this.config.getAppSetting("settings") || {};
    const url = isLive ? settings.liveBuildHook : settings.previewBuildHook;

    if (!url) {
      this.toasterService.popAsync(
        "error",
        "",
        "Web Hook url is not defined. Please check settings page"
      );
      return;
    }

    if (
      isLive &&
      !confirm("The changes will be deployed to live site. Are you sure?")
    ) {
      return;
    }

    const errorHandler = err =>
      this.toasterService.popAsync("error", "", "Sorry. Something is wrong");

    const netlifyHook$ = () =>
      this.settingApi
        .getAll()
        .pipe(map(val => val.find(item => item.key == "netlifyHook")));

    const getNetlifyHook$ = () =>
      timer(5000, 1000).pipe(
        flatMap(netlifyHook$),
        takeWhile(
          val => (val ? val["value"]["state"] === "building" : false),
          true
        )
      );

    forkJoin(this.http.post(url, {}), getNetlifyHook$())
      .pipe(catchError(errorHandler))
      .subscribe(([_, res2]: any) => {
        if (res2) {
          if (res2["value"]["state"] === "ready") {
            window.open(res2["value"]["ssl_url"], "_blank");
            this.settingApi.deleteSetting(res2["id"]).subscribe(_ => null);
          } else {
            this.toasterService.popAsync(
              "error",
              "",
              "Sorry. Building has failed"
            );
            this.settingApi.deleteSetting(res2["id"]).subscribe(_ => null);
          }
        } else {
          this.toasterService.popAsync(
            "error",
            "",
            "Sorry, something went wrong, try again later"
          );
        }
        this.timer = null;
      });
  }
}
