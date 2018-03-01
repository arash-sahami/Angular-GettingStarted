import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

@Injectable()
export class ProductService {
  constructor(private _httpClient: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>("./api/products/products.json")
      .do(x => console.log(x)).catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse, caught: Observable<IProduct[]>): Observable<IProduct[]> {
    throw new Error(error.statusText);
  }

}
