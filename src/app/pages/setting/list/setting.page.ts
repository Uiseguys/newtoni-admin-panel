import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { ToasterService } from "angular2-toaster";

import { ClientApiService } from "../../../services/api/clientapi.service";
import { SettingsService as ConfigService } from "../../../services/settings/settings.service";
import { SettingService } from "../setting.service";

declare var $: any;

@Component({
  selector: "app-setting-page",
  templateUrl: "./setting.page.html",
  styleUrls: ["./setting.page.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SettingPage implements OnInit, OnDestroy {
  settings: any = {
    netlifySiteID: ""
  };
  emailSetting: any = {};

  hook: any = null;
  timer: any = null;

  constructor(
    private api: SettingService,
    private config: ConfigService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      let item;
      item = res.find(item => item.key === "settings");
      this.settings = item ? item.value : {};

      item = res.find(item => item.key === "email");
      this.emailSetting = item ? item.value : {};
    });
    console.log(this.settings);
  }

  ngOnDestroy() {}

  updateNetlifySetting() {
    this.api.updateSetting("settings", this.settings).subscribe(res => {
      this.toasterService.popAsync(
        "success",
        "",
        "Netlify Settings have been updated"
      );
      this.config.setAppSetting("settings", this.settings);
    });
  }

  updateEmailSetting() {
    this.api.updateSetting("settings", this.settings).subscribe(res => {
      this.toasterService.popAsync(
        "success",
        "",
        "Email Address Settings have been updated"
      );
      this.config.setAppSetting("settings", this.settings);
    });
  }
}
