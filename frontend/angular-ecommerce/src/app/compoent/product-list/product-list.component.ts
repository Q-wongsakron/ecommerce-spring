import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

    products: Product[] = [];
    // inject productservice
    constructor(private productService: ProductService) {

    }

    // similar to @PostConstruct
    ngOnInit(): void {
      this.listProducts();
    }

    // method is invoked once you "subscribe" อซิงโคนัส
    listProducts() {
      this.productService.getProductList().subscribe(
        data => {
          this.products = data
          // assign results to the Product array
        }
      )
    }
}
