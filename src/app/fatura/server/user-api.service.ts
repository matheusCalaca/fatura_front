import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  // Define API
  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  /*========================================
  CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // HttpClient API get() method => Fetch Users list
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL + '/user/1/10', this.returnHttpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // HttpClient API post() method => Create User
  createUser(Users): Observable<User> {
    return this.http.post<User>(this.apiURL + '/Users', JSON.stringify(User), this.returnHttpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  login(cpf, senha): Observable<User> {
    return this.http.post<any>(this.apiURL + '/user/auth', JSON.stringify({ 'cpf': cpf, 'password': senha }), this.returnHttpOptions())
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
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
