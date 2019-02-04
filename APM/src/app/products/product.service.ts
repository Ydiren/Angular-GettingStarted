import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

  private productUrl: string = 'api/products/products.json';

  constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
      // Ina  real world app we may send the error to some remote logging infrastructure
      // instead of just logging to console
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        // A client side or network error occurred. Handle accordingly
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        // The backed returened an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }

      console.error(errorMessage);
      return throwError(errorMessage);      
    }
}