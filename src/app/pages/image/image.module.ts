import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";
import { ImageService } from "./image.service";
import { ImagePage } from "./list/image.page";

const routes: Routes = [{ path: "", component: ImagePage }];
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from "@cloudinary/angular-5.x";
import { Cloudinary } from "cloudinary-core";

@NgModule({
  imports: [
    SharedModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: "schneckenhof",
      secure: true
    } as CloudinaryConfiguration),
    RouterModule.forChild(routes)
  ],
  declarations: [ImagePage],
  providers: [ImageService],
  exports: [RouterModule]
})
export class ImageModule {}
