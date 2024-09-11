import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {


  constructor(private productService: ProductService,
              private router: Router
  ){};

  ngOnInit(){
    
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);

  }

}
