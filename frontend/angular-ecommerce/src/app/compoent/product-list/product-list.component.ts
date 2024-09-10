import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

    products: Product[] = [];
    currentCategoryId: number = 1;
    // inject productservice
    constructor(private productService: ProductService,
                private route: ActivatedRoute
    ) {

    }

    // similar to @PostConstruct
    ngOnInit(): void {
      this.route.paramMap.subscribe(() => {
        this.listProducts();
      });
    }

    
    // method is invoked once you "subscribe" อซิงโคนัส
    listProducts() {

      // check if "id" parameter is available
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

      if (hasCategoryId) {
        // get id param string. convert string to a number using the "+" symbol
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      }
      else {
        // not category id avaliable ... default to category id 1
        this.currentCategoryId = 1;
      }

      // now get the products for the given category id
      this.productService.getProductList(this.currentCategoryId).subscribe(
        data => {
          this.products = data
          // assign results to the Product array
        }
      )
    }
}
