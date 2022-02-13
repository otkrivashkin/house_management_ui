import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { routes } from '../../consts/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  routes: typeof routes = routes;

  constructor(private userService: UserService,
              private router: Router) {
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate([routes.LOGIN])
  }
}
