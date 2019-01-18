import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-createProduct-page',
  templateUrl: './createProduct.page.html',
  styleUrls: ['./createProduct.page.scss']
})
export class CreateProductPage implements OnInit {
  type = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toasterService: ToasterService,
    private api: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params.type;
    });
  }

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
      .createProduct({
        ...values,
        type: this.type
      })
      .subscribe(
        res => {
          this.toasterService.popAsync('success', '', 'Product has been created');
          this.router.navigate(['/dashboard/' + this.type]);
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
