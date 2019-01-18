import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { SettingsService } from '../../../services/settings/settings.service';
import { ProductService } from '../../../pages/product/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductPage implements OnInit {
  type = '';

  products: any;
  error = '';
  validUrl = true;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: ProductService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params.type.split("-").join(" ");
      let category = [
        { name: "Artist Books", link: "Artist-Books" },
        { name: "Magazine", link: "Magazine" },
        { name: "New Media", link: "New-Media" },
        { name: "Photography", link: "Photography" },
        { name: "Graphic", link: "Graphic" }];

      let isValid = false;
      // Check for the valid Routes
      for (let i = 0; i < category.length; i++) {
        if (category[i].name == this.type) {
          isValid = true;
          break
        }
      }
      if (isValid === false) {
        this.validUrl = false;
        // this.router.navigate(['/'])
      } else {
        this.validUrl = true;
        this.api.getProducts(params.type).subscribe(res => {
          this.products = res;
        });
      }


    });
  }

  deleteProduct(product) {
    if (!confirm('Are you sure to delete')) {
      return;
    }

    this.api.deleteProduct(product.id).subscribe(
      res => {
        this.products = this.products.filter(item => item.id != product.id);
      },
      res => {
        const error = JSON.parse(res._body);
        this.error =
          (error.error && error.error.message) || 'Sorry, something is wrong';
      }
    );
  }

  getRoleName(role) {
    return role.map(item => item.name).join(',');
  }
}
