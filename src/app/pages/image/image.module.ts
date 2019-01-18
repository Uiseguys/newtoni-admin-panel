import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ImageService } from './image.service';
import { ImagePage } from './list/image.page';

const routes: Routes = [{ path: '', component: ImagePage }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ImagePage],
  providers: [ImageService],
  exports: [RouterModule]
})
export class ImageModule {}
