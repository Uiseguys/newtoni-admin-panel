import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { OrderService } from './order.service';
import { OrderPage } from './list/order.page';

const routes: Routes = [{ path: '', component: OrderPage }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [OrderPage],
  providers: [OrderService],
  exports: [RouterModule]
})
export class OrderModule {}
