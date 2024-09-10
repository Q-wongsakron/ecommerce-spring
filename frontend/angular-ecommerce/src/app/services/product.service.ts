import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'

  constructor(private httpClient: HttpClient) { }

  // return an observable  MAP the Json data from Spring Data Rest to
  // Product array
  getProductList(theCategoryId: number): Observable<Product[]> {

    // @TODO: need to build URL based on category id ...
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`


    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    ); 
  }
}

// Unwraps the JSON from Spring Data REST _embedded entry
// access the array of product
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}