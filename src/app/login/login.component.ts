import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../fatura/server/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public cpf: number;
  public senha: string;
  public user: string;

  constructor(private userApi: UserApiService) { }

  ngOnInit() {
  }

  showLogin() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')).nome;
      return false;
    }
    return true;
  }

  login() {
    this.userApi.login(this.cpf, this.senha).subscribe(result => {
      localStorage.setItem('user', JSON.stringify(result));
    },
      err => {
        console.log(err);
      });
  }

  logout() {
    localStorage.removeItem('user');
  }


}
