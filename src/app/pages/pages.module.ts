import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AuthGuardResolve } from '../services/authguard/authguard.service';
import { ServicesModule } from '../services/services.module';
import { LayoutModule } from '../layout/layout.module';
import { DashboardLayoutComponent } from '../layout/dashboardlayout/dashboardlayout.component';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { EditionsComponent } from './editions/editions.component';
import { NewsComponent } from './news/news.component';
import { PublicationsComponent } from './publications/publications.component';
import { PublicationsFormComponent } from './publications/publications-form/publications-form.component';
import { CreateComponent } from './publications/create/create.component';
import { EditComponent } from './publications/edit/edit.component';
import { ListComponent } from './publications/list/list.component';

export const routes = [
  {
    path: 'login',
    component: LoginPage,
    canActivate: [AuthGuardResolve]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    resolve: {
      user: AuthGuardResolve
    },
    children: [
      { path: '', redirectTo: '/dashboard/Artist-Books', pathMatch: 'full' },

  
      { path: 'payments', loadChildren: './order/order.module#OrderModule' },
     
      {
        path: 'images',
        loadChildren: './image/image.module#ImageModule'
      },
      {
        path: 'settings',
        loadChildren: './setting/setting.module#SettingModule'
      },
      { path: ':type', loadChildren: './product/product.module#ProductModule' }
    ]
  },
  { path: '**', redirectTo: 'login' }
  // Not found
];

@NgModule({
  imports: [SharedModule, LayoutModule, RouterModule.forRoot(routes)],
  declarations: [LoginPage, RegisterPage, EditionsComponent, NewsComponent, PublicationsComponent, PublicationsFormComponent, CreateComponent, EditComponent, ListComponent],
  providers: [],
  exports: [RouterModule]
})
export class PagesModule {}
