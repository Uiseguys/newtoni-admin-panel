import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-editProduct-page',
  templateUrl: './editProduct.page.html',
  styleUrls: ['./editProduct.page.scss']
})
export class EditProductPage implements OnInit {
  error = '';
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toasterService: ToasterService,
    private api: ProductService
  ) {
    this.route.params.subscribe(params => {
      this.api.getProduct(params.id).subscribe(res => {
        this.product = res;
      });
    });
  }

  ngOnInit() {}

  handleSubmit(values) {
    if(parseInt(values.availability)){
      values.availability = true
    }else{
      values.availability = false
    }
    if(values.content){
      values.content = 1
    }else{
      values.content = 0
    }
    if(!values.description){
      values.description = ""
    }
    if(!values.no){
      values.no = 0
    }
    this.api
      .updateProduct(this.product.id, {
        ...this.product,
        ...values
      })
      .subscribe(
        res => {
          this.toasterService.popAsync('success', '', 'Product has been updated');
          this.router.navigate(['/dashboard/' + this.product.type]);
        },
        res => {
          const body = JSON.parse(res._body);
          this.toasterService.popAsync(
            'error',
            '',
            (body.error && body.error.message) || 'Sorry, something is wrong'
          );
        }
      );
  }
}
