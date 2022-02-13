import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../../models/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserFormPageComponent } from '../user-form-page/user-form-page.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-table-page',
  templateUrl: './user-table-page.component.html',
  styleUrls: ['./user-table-page.component.css']
})
export class UserTablePageComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'id',
    'name',
    'gender',
    'phoneNumber',
    'email',
    'address',
    'position',
    'actions'
  ];
  dataSource: MatTableDataSource<any>;

  private unsubscribeAll = new Subject();

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
    });
  }

  createUser() {
    const dialogRef = this.dialog.open(UserFormPageComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.userService.getAll().subscribe(users => {
          this.dataSource = new MatTableDataSource(users);
        });
      });
  }

  updateUser(user: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;

    const dialogRef = this.dialog.open(UserFormPageComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.userService.getAll().subscribe(users => {
          this.dataSource = new MatTableDataSource(users);
        });
      });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(() => {
        this.userService.getAll().subscribe(users => {
          this.dataSource = new MatTableDataSource(users);
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.complete();
  }
}
