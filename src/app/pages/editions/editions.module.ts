import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";
import { ImageService } from "../../pages/image/image.service";
import { SettingsService } from "../../services/settings/settings.service";
import { EditionsService } from "./editions.service";
import { EditionsFormComponent } from "./editions-form/editions-form.component";
import { ListComponent } from "./list/list.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { QuillModule } from "ngx-quill";
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from "@cloudinary/angular-5.x";
import { Cloudinary } from "cloudinary-core";

const routes: Routes = [
  { path: "", component: ListComponent },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: ":id",
    component: EditComponent
  }
];

@NgModule({
  imports: [
    QuillModule.forRoot(),
    SharedModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: "schneckenhof",
      secure: true
    } as CloudinaryConfiguration),
    RouterModule.forChild(routes)
  ],
  declarations: [
    EditionsFormComponent,
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  providers: [EditionsService, ImageService, SettingsService],
  exports: [RouterModule]
})
export class EditionsModule {}
