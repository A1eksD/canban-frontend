import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UrlService } from '../service/urls-service.service';
import { UserToken } from '../interfece/user-token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  constructor(private urlService: UrlService, private router: Router){}

  async login() {

    try{
      let response = await this.urlService.loginWithUsernameAndPassword(this.userName, this.password) as UserToken;
      console.log('response', response);
      if (response) {
        localStorage.setItem('token', response.token); 
        localStorage.setItem('userID', response.user_id.toString()); 
      }
      this.router.navigateByUrl('/todos');
    } catch (e){
      console.error('error', e);
    }
  }
  
}

