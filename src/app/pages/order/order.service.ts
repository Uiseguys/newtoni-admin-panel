/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';

import { Api } from '../../services/api/api.service';

@Injectable()
export class OrderService {
  constructor(private api: Api) {}

  // ---------- product api ----------
  getOrderCount(type) {
    const filter = {
      or: [{ completed: { neq: null } }, { type: 'email' }]
    };

    return this.api.get(`/Orders/count?where=${JSON.stringify(filter)}`);
  }

  getOrders(type, page = 1, pageSize = 20) {
    const filter = {
      skip: page > 0 ? (page - 1) * pageSize : 0,
      limit: pageSize,
      order: ['created DESC', 'completed DESC'],
      where: {
        or: [{ completed: { neq: null } }, { type: 'email' }]
      }
    };
    return this.api.get(`/Orders?filter=${JSON.stringify(filter)}`);
  }

  searchOrders(type, key) {
    const filter = {
      where: {
        name: { like: `${encodeURIComponent(key)}%25` }
        // or: {
        //   type: 'email'
        // }
      }
    };
    return this.api.get(`/Orders?filter=${JSON.stringify(filter)}`);
  }

  createOrder(info) {
    return this.api.post('/Orders', info);
  }

  updateOrder(id, info) {
    return this.api.patch(`/Orders/${id}`, info);
  }

  getOrder(id) {
    const filter = {};
    return this.api.get(`/Orders/${id}?filter=${JSON.stringify(filter)}`);
  }

  deleteOrder(id) {
    return this.api.delete(`/Orders/${id}`);
  }
}
