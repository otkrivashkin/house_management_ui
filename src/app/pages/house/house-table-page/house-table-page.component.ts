import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { HouseService } from '../../../services/house.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HouseFormPageComponent } from '../../house/house-form-page/house-form-page.component';
import { House } from '../../../models/house';

@Component({
  selector: 'app-house-table-page',
  templateUrl: './house-table-page.component.html',
  styleUrls: ['./house-table-page.component.css']
})
export class HouseTablePageComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'id',
    'listing',
    'houseType',
    'bathroomCount',
    'bedRoomCount',
    'totalRoomCount',
    'parkingSpotCount',
    'livingArea',
    'createdAt',
    'address',
    'price',
    'comments',
    'actions'
  ];
  dataSource: MatTableDataSource<any>;

  private unsubscribeAll = new Subject();

  constructor(
    private houseService: HouseService,
    public dialog: MatDialog
  ) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.houseService.getAll().subscribe(houses => {
      this.dataSource = new MatTableDataSource(houses);
    });
  }

  createHouse() {
    const dialogRef = this.dialog.open(HouseFormPageComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.houseService.getAll().subscribe(houses => {
          this.dataSource = new MatTableDataSource(houses);
        });
      });
  }

  updateHouse(house: House) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = house;
    dialogConfig.width = '500px';

    const dialogRef = this.dialog.open(HouseFormPageComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.houseService.getAll().subscribe(houses => {
          this.dataSource = new MatTableDataSource(houses);
        });
      });
  }

  deleteHouse(house: House) {
    this.houseService.deleteHouse(house.id).subscribe(() => {
        this.houseService.getAll().subscribe(houses => {
          this.dataSource = new MatTableDataSource(houses);
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.complete();
  }

}
