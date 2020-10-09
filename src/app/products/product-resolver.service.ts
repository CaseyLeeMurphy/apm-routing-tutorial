import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, scheduled } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductResolved } from './product';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<ProductResolved> {
  constructor(private readonly productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductResolved> {
    const lProductId = route.paramMap.get('id');

    if (isNaN(+lProductId)) {
      const lMessage = `Product ID was not a number: ${lProductId}`;
      console.error(lMessage);
      return of({ product: null, error: lMessage });
    }

    return this.productService.getProduct(+lProductId).pipe(
      map((product) => ({ product })),
      catchError((inError) => {
        const lMessage = `Retrieval error: ${inError}`;
        console.error(lMessage);
        return of({ product: null, error: lMessage });
      })
    );
  }
}
