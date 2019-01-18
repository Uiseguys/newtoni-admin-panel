import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SelectModule } from 'ng2-select';
import { FileUploadModule } from 'ng2-file-upload';
import { I18NextModule } from 'angular-i18next';
import { ToasterModule } from 'angular2-toaster';

import { AttachUploader } from './attachUploader/attachUploader';

import { SettingsService } from '../services/settings/settings.service';
import { Api } from '../services/api/api.service';
import { ClientApiService } from '../services/api/clientapi.service';
import { AuthGuardResolve } from '../services/authguard/authguard.service';

import { I18NextFormatPipe } from './pipes/i18next.pipe';

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    SelectModule,
    FileUploadModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ToasterModule
  ],
  providers: [AuthGuardResolve],
  declarations: [I18NextFormatPipe, AttachUploader],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    SelectModule,
    FileUploadModule,
    ModalModule,
    TooltipModule,
    CollapseModule,
    BsDropdownModule,
    ToasterModule,
    AttachUploader,
    I18NextFormatPipe
  ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SettingsService, Api, ClientApiService]
    };
  }
}
