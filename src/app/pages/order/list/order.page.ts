import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

import { SettingsService } from '../../../services/settings/settings.service';
import { OrderService } from '../../../pages/order/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderPage implements OnInit {
  type = '';

  page = 1;
  orders: any;
  error = '';

  pageConfig = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 1
  };

  selectedOrder: any = {
    items: []
  };
  detailModalRef;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: OrderService,
    private modalService: BsModalService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params.type;
      this.route.queryParams.subscribe(queryParams => {
        // Defaults to 0 if no query param provided.
        const page = queryParams['page'] || 1;
        this.api.getOrderCount(this.type).subscribe(res => {
          this.pageConfig.totalItems = res.count;
        });

        this.page = page;
        this.orders = this.api.getOrders(
          this.type,
          page,
          this.pageConfig.itemsPerPage
        );
        this.pageConfig.currentPage = page;
      });
    });
  }

  getOrders(page: number) {
    this.router.navigate(['/dashboard/payments'], { queryParams: { page } });
  }

  showDetailModal(order, template) {
    this.selectedOrder = order.details;
    this.detailModalRef = this.modalService.show(template);
  }
}
