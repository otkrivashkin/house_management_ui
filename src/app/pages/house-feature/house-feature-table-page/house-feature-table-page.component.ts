import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HouseFeatureService } from '../../../services/house-feature.service';
import { HouseFeatureFormPageComponent } from '../house-feature-form-page/house-feature-form-page.component';
import { HouseFeature } from '../../../models/house-feature';

@Component({
  selector: 'app-house-feature-table-page',
  templateUrl: './house-feature-table-page.component.html',
  styleUrls: ['./house-feature-table-page.component.css']
})
export class HouseFeatureTablePageComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'actions'
  ];
  dataSource: MatTableDataSource<any>;

  private unsubscribeAll = new Subject();

  constructor(private houseFeatureService: HouseFeatureService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.houseFeatureService.getAll().subscribe(houseFeatures => {
      this.dataSource = new MatTableDataSource(houseFeatures);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createHouseFeature() {
    const dialogRef = this.dialog.open(HouseFeatureFormPageComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.houseFeatureService.getAll().subscribe(houseFeatures => {
          this.dataSource = new MatTableDataSource(houseFeatures);
        });
      });
  }

  updateHouseFeature(houseFeature: HouseFeature) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = houseFeature;

    const dialogRef = this.dialog.open(HouseFeatureFormPageComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.houseFeatureService.getAll().subscribe(houseFeatures => {
          this.dataSource = new MatTableDataSource(houseFeatures);
        });
      });
  }

  deleteHouseFeature(houseFeature: HouseFeature) {
    this.houseFeatureService.deleteHouseFeature(houseFeature.id).subscribe(() => {
        this.houseFeatureService.getAll().subscribe(houseFeatures => {
          this.dataSource = new MatTableDataSource(houseFeatures);
        });
      }
    );
  }

}
