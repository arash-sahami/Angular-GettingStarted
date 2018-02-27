import { Component, OnInit } from "@angular/core"
import { IProduct } from "./product"
import { ProductService } from "./product.service";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls:  ['./product-list.component.less']
})


export class ProductListComponent implements OnInit {
  pageTitle: string = "Product list";
  imageWidth: number = 50;
  imageMargin: number = 2;
  _listFilter: string;
  showImage: boolean = false;

  filteredProducts: IProduct[];

  get listFilter() {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = value ? this.performFilter(value) : this.products;
  }

  get products(): IProduct[] {
    return this._productService.getProducts();
  }

  constructor(private _productService : ProductService) {
    this.filteredProducts = this.products;
    this.listFilter = "";
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit() {
    console.log("In OnInit");
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
