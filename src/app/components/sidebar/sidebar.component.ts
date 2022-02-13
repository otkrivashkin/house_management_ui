import { Component, OnInit } from '@angular/core';
import { routes } from '../../consts/routes';
import { UserService } from '../../services/user.service';
import { Position } from '../../consts/position';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public routes: typeof routes = routes;
  public position = Position;

  currentPosition = Position.CLIENT;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.currentPosition = this.userService.currentPosition;
  }
}
