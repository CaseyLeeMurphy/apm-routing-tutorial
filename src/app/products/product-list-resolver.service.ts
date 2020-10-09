import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ProductListResolver implements Resolve<Product[]> {
  constructor(private readonly _productsService: ProductService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
    return this._productsService.getProducts().pipe(
      catchError((inError) => {
        return [];
      })
    );
  }
}
