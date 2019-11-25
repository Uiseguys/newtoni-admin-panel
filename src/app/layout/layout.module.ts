import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SharedModule } from "../shared/shared.module";
import { SettingService } from "../pages/setting/setting.service";
import { DashboardLayoutComponent } from "./dashboardlayout/dashboardlayout.component";
import { GoTrueJs } from "../services/netlify/gotrue-js.service";

@NgModule({
  imports: [CommonModule, RouterModule, BrowserAnimationsModule, SharedModule],
  providers: [SettingService, GoTrueJs],
  declarations: [DashboardLayoutComponent],
  exports: [DashboardLayoutComponent, SharedModule]
})
export class LayoutModule {}
