import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  ViewEncapsulation
} from "@angular/core";
import { Router } from "@angular/router";
import { ToasterConfig, ToasterService } from "angular2-toaster";
import { Http } from "@angular/http";

import { SettingsService as ConfigService } from "../../services/settings/settings.service";
import { ClientApiService } from "../../services/api/clientapi.service";
import { SettingService } from "../../pages/setting/setting.service";
import { GoTrueJs } from "../../services/netlify/gotrue-js.service";

declare var $: any;

@Component({
  selector: "app-dashboardlayout",
  templateUrl: "./dashboardlayout.component.html",
  styleUrls: ["./dashboardlayout.component.scss"]
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  toasterconfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: false,
    timeout: 2000
  });

  user: any;
  lang = "";
  timer: any = null;

  constructor(
    public http: Http,
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
      const item = res.find(item => item.key === "settings");
      this.config.setAppSetting("settings", item ? item.value : {});
      const hook = res.find(item => item.key === "netlifyHook");
      if (hook && hook.value.state === "building") {
        this.startWatch();
      }
    });

    this.settingApi.getSetting("netlifyHook").subscribe(res => {
      if (res.length)
        this.settingApi.deleteSetting(res[0].id).subscribe(res => {});
    });
  }

  ngOnDestroy() {
    this.stopWatch();
  }

  startWatch() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.settingApi.getSetting("netlifyHook").subscribe(res => {
        if (!res.length) return;

        const detail = res[0].value;

        if (detail.state === "ready") {
          this.stopWatch();
          window.open(detail.url, "_blank");
          this.settingApi.deleteSetting(res[0].id).subscribe(res => {});
        } else if (detail.state === "failed") {
          this.stopWatch();
          this.toasterService.popAsync(
            "error",
            "",
            "Sorry. Building has been failed"
          );
          this.settingApi.deleteSetting(res[0].id).subscribe(res => {});
        } else {
          this.stopWatch();
          this.toasterService.popAsync(
            "error",
            "",
            "Sorry. Building has been failed"
          );
          this.settingApi.deleteSetting(res[0].id).subscribe(res => {});
        }
      });
    }, 3500);
  }

  stopWatch() {
    if (!this.timer) return;

    clearInterval(this.timer);
    this.timer = null;
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

    this.http.post(url, {}).subscribe(
      res => {
        this.startWatch();
      },
      err => {
        this.toasterService.popAsync("error", "", "Sorry. Something is wrong");
      }
    );
  }
}
