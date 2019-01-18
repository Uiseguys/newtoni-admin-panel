/**
 * Created by S.Angel on 4/2/2017.
 */
import { Injectable } from '@angular/core';

import { Api } from '../../services/api/api.service';

@Injectable()
export class ProductService {
  constructor(private api: Api) {}

  // ---------- product api ----------
  getProductCount(type) {
    const filter = {
      type
    };

    return this.api.get(`/Products/count?where=${JSON.stringify(filter)}`);
  }

  getAll() {
    const filter = {
      order: ['type', 'priority ASC']
    };
    return this.api.get(`/Products?filter=${JSON.stringify(filter)}`);
  }

  getProducts(type) {
    const filter = {
      order: 'priority ASC',
      where: {
        type
      }
    };
    return this.api.get(`/Products?filter=${JSON.stringify(filter)}`);
  }

  searchProducts(type, key) {
    const filter = {
      where: {
        name: { like: `${encodeURIComponent(key)}%25` },
        type
      },
      order: ['priority ASC']
    };
    return this.api.get(`/Products?filter=${JSON.stringify(filter)}`);
  }

  createProduct(info) {
    console.log(info)
    return this.api.post('/Products', info);
  }

  updateProduct(id, info) {
    return this.api.patch(`/Products/${id}`, info);
  }

  getProduct(id) {
    const filter = {
      include: ['packaging']
    };
    return this.api.get(`/Products/${id}`);
  }

  deleteProduct(id) {
    return this.api.delete(`/Products/${id}`);
  }
}
