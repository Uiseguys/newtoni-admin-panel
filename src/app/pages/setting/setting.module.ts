import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SettingService } from './setting.service';
import { SettingPage } from './list/setting.page';

const routes: Routes = [{ path: '', component: SettingPage }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [SettingPage],
  providers: [SettingService],
  exports: [RouterModule]
})
export class SettingModule {}
