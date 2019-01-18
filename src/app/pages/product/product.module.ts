import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ImageService } from '../../pages/image/image.service';
import { SettingsService } from '../../services/settings/settings.service';
import { ProductService } from './product.service';
import { ProductForm } from './productForm/productForm';
import { ProductPage } from './list/product.page';
import { CreateProductPage } from './create/createProduct.page';
import { EditProductPage } from './edit/editProduct.page';

const routes: Routes = [
  { path: '', component: ProductPage },
  {
    path: 'create',
    component: CreateProductPage
  },
  {
    path: ':id',
    component: EditProductPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ProductForm, ProductPage, CreateProductPage, EditProductPage],
  providers: [ProductService,  ImageService, SettingsService],
  exports: [RouterModule]
})
export class ProductModule {}
