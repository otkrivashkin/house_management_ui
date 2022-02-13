import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../consts/routes';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  public routers: typeof routes = routes;

  form: FormGroup;

  credentialsValid = true;

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public sendLoginForm(): void {

    this.userService.checkIfUserExists(this.form.value).subscribe((user) => {
      if (!user) {
        this.credentialsValid = false;
      } else {
        this.userService.login(user);
        this.router.navigate([routes.HOUSES]);
      }
    });

  }
}
