import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angular-6-social-login';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  name: string;
  user: SocialUser;
  loggedIn: boolean = false;
  id: string;
  userId: any;
  constructor(
    private router: Router,
    private socialAuthService: AuthService,
    private userService :UserService ) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  public socialLogin() {
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.name = userData.name;
        this.id = userData.id;
        this.getUserId(userData.id);
        if(this.userId = null) {
          let data = { id: userData.id};

          this.postUser(data);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              name: this.name
            }
          };
          this.router.navigate(['profile'], navigationExtras);
        } else {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              name: this.name
            }
          };
          this.router.navigate(['profile'], navigationExtras);
        }      
      }
    );
  }
  getUserId(id) {
    this.userService.get(id).then(
        (res) => {
          this.userId = res;
        });
  }
  postUser(data) {
    this.userService.post(data)
    .subscribe(
        (res) => {
          //console.log(res);
        });
  }
} 
