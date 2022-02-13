import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SkillService } from '../../../services/skill.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SkillFormPageComponent } from '../skill-form-page/skill-form-page.component';
import { Skill } from '../../../models/skill';

@Component({
  selector: 'app-skill-table-page',
  templateUrl: './skill-table-page.component.html',
  styleUrls: ['./skill-table-page.component.css']
})
export class SkillTablePageComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'description',
    'actions'
  ];
  dataSource: MatTableDataSource<any>;

  private unsubscribeAll = new Subject();

  constructor(private skillService: SkillService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.skillService.getAll().subscribe(skills => {
      this.dataSource = new MatTableDataSource(skills);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createSkill() {
    const dialogRef = this.dialog.open(SkillFormPageComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.skillService.getAll().subscribe(skills => {
          this.dataSource = new MatTableDataSource(skills);
        });
      });
  }

  updateSkill(skill: Skill) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = skill;

    const dialogRef = this.dialog.open(SkillFormPageComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.skillService.getAll().subscribe(skills => {
          this.dataSource = new MatTableDataSource(skills);
        });
      });
  }

  deleteSkill(skill: Skill) {
    this.skillService.deleteSkill(skill.id).subscribe(() => {
        this.skillService.getAll().subscribe(skills => {
          this.dataSource = new MatTableDataSource(skills);
        });
      }
    );
  }

}
