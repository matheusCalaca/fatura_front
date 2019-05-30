import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Fatura } from 'src/app/model/Fatura';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaturaServiceApiService {

  // Define API
  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  /*========================================
  CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };
  getFaturas(pagina: number, tamanho: number): Observable<Fatura[]> {
    return this.http.get<Fatura[]>(`${this.apiURL}/fatura/${tamanho}/${pagina}`, this.returnHttpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  getFaturasSize(): Observable<number> {
    return this.http.get<number>(this.apiURL + '/fatura/size', this.returnHttpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

 
  // HttpClient API post() method => Create User
  createFatura(fatura): Observable<Fatura> {
    return this.http.post<Fatura>(this.apiURL + '/fatura/add', JSON.stringify(fatura), this.returnHttpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // HttpClient API put() method => Update FATURA
  updateFatura(id, fatura): Observable<Fatura> {
    return this.http.put<Fatura>(this.apiURL + '/fatura/' + id, JSON.stringify(fatura), this.returnHttpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // HttpClient API delete() method => Delete User
  deleteFatura(id) {
    return this.http.delete<Fatura>(this.apiURL + '/fatura/' + id, this.returnHttpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  returnHttpOptions() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'userId': JSON.parse(localStorage.getItem('user')).userId
        })
      };
    }
    return this.httpOptions;
  }
  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
