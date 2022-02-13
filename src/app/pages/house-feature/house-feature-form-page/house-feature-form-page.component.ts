import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HouseFeatureService } from '../../../services/house-feature.service';
import { HouseFeature } from '../../../models/house-feature';

@Component({
  selector: 'app-house-feature-form-page',
  templateUrl: './house-feature-form-page.component.html',
  styleUrls: ['./house-feature-form-page.component.css']
})
export class HouseFeatureFormPageComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private houseFeatureService: HouseFeatureService,
              private dialogRef: MatDialogRef<HouseFeatureFormPageComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    const form = this.fb.group({
      id: [],
      name: []
    });

    if (data) {
      form.reset(data);
    }

    this.form = form;
  }

  async submit() {
    let houseFeature = this.form.value as HouseFeature;
    const createHouseFeature$ = (houseFeature) => this.houseFeatureService.createHouseFeature(houseFeature);
    const updateHouseFeature$ = (houseFeature) => this.houseFeatureService.updateHouseFeature(houseFeature.id, houseFeature);
    const res$ = houseFeature.id ? updateHouseFeature$(houseFeature) : createHouseFeature$(houseFeature);

    res$.subscribe(() => this.dialogRef.close());
  }

  close() {
    this.dialogRef.close();
  }

}
