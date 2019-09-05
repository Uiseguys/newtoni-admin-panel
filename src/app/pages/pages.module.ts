import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { AuthGuardResolve } from "../services/authguard/authguard.service";
import { ServicesModule } from "../services/services.module";
import { LayoutModule } from "../layout/layout.module";
import { DashboardLayoutComponent } from "../layout/dashboardlayout/dashboardlayout.component";
import { LoginPage } from "./login/login.page";
import { RegisterPage } from "./register/register.page";
import { PublicationsFormComponent } from "./publications/publications-form/publications-form.component";

export const routes = [
  {
    path: "login",
    component: LoginPage,
    canActivate: [AuthGuardResolve]
  },
  {
    path: "dashboard",
    component: DashboardLayoutComponent,
    resolve: {
      user: AuthGuardResolve
    },
    children: [
      { path: "", redirectTo: "/dashboard/news", pathMatch: "full" },
      { path: "payments", loadChildren: "./order/order.module#OrderModule" },
      {
        path: "publications",
        loadChildren: "./publications/publications.module#PublicationsModule"
      },
      {
        path: "news",
        loadChildren: "./news/news.module#NewsModule"
      },
      {
        path: "editions",
        loadChildren: "./editions/editions.module#EditionsModule"
      },
      {
        path: "images",
        loadChildren: "./image/image.module#ImageModule"
      },
      {
        path: "settings",
        loadChildren: "./setting/setting.module#SettingModule"
      }
    ]
  },
  { path: "**", redirectTo: "login" }
  // Not found
];

@NgModule({
  imports: [SharedModule, LayoutModule, RouterModule.forRoot(routes)],
  declarations: [LoginPage, RegisterPage],
  providers: [],
  exports: [RouterModule]
})
export class PagesModule {}
