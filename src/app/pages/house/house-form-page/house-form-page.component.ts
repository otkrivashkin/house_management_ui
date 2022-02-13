import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ImageService } from '../../../services/image.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, switchMap } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { Position } from '../../../consts/position';
import { Listing } from '../../../consts/listing';
import { HouseType } from '../../../consts/house-type';
import { BathroomCount } from '../../../consts/bathroom-count';
import { BedroomCount } from '../../../consts/bedroom-count';
import { TotalRoomCount } from '../../../consts/total-room-count';
import { ParkingSpotCount } from '../../../consts/parking-spot-count';
import { HouseFeature } from '../../../models/house-feature';
import { HouseFeatureService } from '../../../services/house-feature.service';
import { HouseService } from '../../../services/house.service';
import { House } from '../../../models/house';
import { Image } from '../../../models/image';

@Component({
  selector: 'app-house-form-page',
  templateUrl: './house-form-page.component.html',
  styleUrls: ['./house-form-page.component.css']
})
export class HouseFormPageComponent implements OnInit {

  form: FormGroup;
  house: House;
  imgUrls: any[] = [];
  files: File[] = [];
  availableFeatures: HouseFeature[];
  selectedFeature: HouseFeature;
  agents: User[];
  clients: User[];

  public listings: typeof Listing = Listing;
  public houseTypes: typeof HouseType = HouseType;
  public bathroomCounts: typeof BathroomCount = BathroomCount;
  public bedroomCounts: typeof BedroomCount = BedroomCount;
  public totalRoomCounts: typeof TotalRoomCount = TotalRoomCount;
  public parkingSpotCounts: typeof ParkingSpotCount = ParkingSpotCount;

  get features() {
    return this.form.controls['features'] as FormArray;
  }

  get images() {
    return this.form.get('images') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private houseService: HouseService,
              private imageService: ImageService,
              private houseFeatureService: HouseFeatureService,
              private dialogRef: MatDialogRef<HouseFormPageComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.house = data;
    this.form = this.fb.group({
      id: [],
      agentId: [],
      clientId: [],
      listing: [],
      houseType: [],
      bathroomCount: [],
      bedRoomCount: [],
      totalRoomCount: [],
      parkingSpotCount: [],
      livingArea: [],
      createdAt: [],
      address: [],
      price: [],
      comments: [],
      features: this.fb.array([]),
      images: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.houseFeatureService.getAll().subscribe(features => {
      this.availableFeatures = features;

      if (this.house && this.house.features) {
        console.log('features', this.house.features);
        this.house.features.forEach(feature => {
          this.addFeature(feature);
        });
      }
    });

    this.userService.getAll().subscribe(users => {
      this.clients = users.filter(u => u.position === Position.CLIENT);
      this.agents = users.filter(u => u.position === Position.AGENT);
    });



    if (this.house) {
      let existingHouse = this.house as House;
      this.form.reset(existingHouse);
      if (existingHouse.agent) {
        this.form.patchValue({ agentId: existingHouse.agent.id });
      }

      if (existingHouse.client) {
        this.form.patchValue({ clientId: existingHouse.client.id });
      }

      if (existingHouse.images) {
        for (let image of existingHouse.images) {
          this.images.push(this.fb.group({
            id: [image.id],
            data: ['data:image/png;base64,' + image.data]
          }))
        }
      }
    }
  }

  async submit() {
    let house = this.form.value as House;

    let houseFeatures = this.features.value as Array<HouseFeature>;
    house.featureIds = houseFeatures.map(h => h.id);
    house.imageIds = (this.images.value as Array<Image>).map(image => image.id);
    house.images = [];
    const createHouse$ = (house) => this.houseService.createHouse(house);
    const updateHouse$ = (house) => this.houseService.updateHouse(house.id, house);
    const uploadImages$ = (files) => this.imageService.uploadImages(files);

    let res = of<House>();
    if (this.files) {
      res = uploadImages$(this.files)
        .pipe(switchMap((imageIds: number[]) => {
          house.imageIds = [...imageIds, ...house.imageIds];
          return house.id ? updateHouse$(house) : createHouse$(house);
        }));
    } else {
      res = house.id ? updateHouse$(house) : createHouse$(house);
    }

    res.subscribe(() => this.dialogRef.close());
  }

  close() {
    this.dialogRef.close();
  }

  onFileChanged(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      // this.msg = 'You must select an image';
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    this.files.push(event.target.files[0]);
    reader.onload = (_event) => {
      // this.msg = "";
      // this.imgUrls[this.imgUrls.length] = reader.result;
      this.images.push(this.fb.group({
        data: [reader.result]
      }))
    };
  }

  selectionFeatureChange(event: MatSelectChange) {
    this.selectedFeature = event.value;
  }

  addFeature(_feature?: HouseFeature) {
    if (_feature && this.availableFeatures) {
        this.availableFeatures = this.availableFeatures.filter(feature => feature.id !== _feature.id);

        this.features.push(this.fb.group({
          id: [_feature.id],
          description: [_feature.name]
        }));

    } else {
      this.availableFeatures = this.availableFeatures.filter(feature => feature.id !== this.selectedFeature.id);

      this.features.push(this.fb.group({
        id: [this.selectedFeature.id],
        description: [this.selectedFeature.name]
      }));
    }
  }

  removeFeature(featureIndex: number) {
    this.availableFeatures.push(this.features.at(featureIndex).value);
    this.features.removeAt(featureIndex);

  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }
}
