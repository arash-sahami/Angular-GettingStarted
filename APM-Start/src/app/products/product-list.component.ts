import { Component, OnInit } from "@angular/core"
import { IProduct } from "./product"
import { ProductService } from "./product.service";

@Component({
  //selector: 'pm-products',    //Component nesting 
  templateUrl: './product-list.component.html',
  styleUrls:  ['./product-list.component.less']
})


export class ProductListComponent implements OnInit {
  pageTitle: string = "Product list";
  imageWidth: number = 50;
  imageMargin: number = 2;
  _listFilter: string;
  showImage: boolean = false;
  _products: IProduct[];

  filteredProducts: IProduct[];

  get listFilter() {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = value ? this.performFilter(value) : this.products;
  }

  get products(): IProduct[] {
    return this._products;
  }

  set products(arg: IProduct[]) {
    this._products = arg;
  }

  constructor(private _productService : ProductService) {
    this.filteredProducts = this.products;
    this.listFilter = "";
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit() {
    this._productService.getProducts().subscribe(products => {
      this.products = products
      this.filteredProducts = this.products;
    }, error => alert(error));
  }

  performFilter(filterBy: string): any {
    filterBy = filterBy.toLowerCase();

    return this.products.filter((product: IProduct) => {
      return product.productName.toLowerCase().startsWith(filterBy);
    });
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Product List: " + message;
  }

}
