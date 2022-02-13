import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../../services/image.service';
import { of, switchMap } from 'rxjs';
import { SkillService } from '../../../services/skill.service';
import { Skill } from '../../../models/skill';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-user-form-page',
  templateUrl: './user-form-page.component.html',
  styleUrls: ['./user-form-page.component.css']
})
export class UserFormPageComponent implements OnInit {

  form: FormGroup;
  user: User;
  imgUrl: any;
  file: File;
  availableSkills: Skill[];
  selectedSkill: Skill;
  agents: User[];

  get skills() {
    return this.form.controls['skills'] as FormArray;
  }

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private imageService: ImageService,
              private skillService: SkillService,
              private dialogRef: MatDialogRef<UserFormPageComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.user = data;

  }

  ngOnInit(): void {
    this.skillService.getAll().subscribe(skills => {
      this.availableSkills = skills;
      if (this.user && this.user.skills) {
        this.user.skills.forEach(skill => {
          this.addSkill(skill);
        });
      }
    });

    this.userService.getAllAgents().subscribe(agents => this.agents = agents);

    const form = this.fb.group({
      id: [],
      name: [],
      email: [],
      gender: [],
      phoneNumber: [],
      address: [],
      password: [],
      position: [],
      agentId: [],
      description: [],
      skills: this.fb.array([])
    });

    if (this.user) {
      let existingUser = this.user;
      form.reset(existingUser);
      if (existingUser.agent) {
        form.patchValue({ agentId: existingUser.agent.id });
      }

      if (existingUser.image) {
        this.imgUrl = 'data:image/png;base64,' + existingUser.image.data;
      }

    } else {
      form.reset({ gender: 'UNDEFINED', position: 'AGENT' });
    }

    this.form = form;
  }

  async submit() {
    let user = this.form.value as User;
    let _skills = this.skills.value as Array<Skill>;
    user.skillIds = _skills.map(s => s.id);
    const createUser$ = (user) => this.userService.createUser(user);
    const updateUser$ = (user) => this.userService.updateUser(user.id, user);
    const uploadImage$ = (file) => this.imageService.uploadImage(file);
    let res = of<User>();
    if (this.file) {
      res = uploadImage$(this.file)
        .pipe(switchMap((imageId: number) => {
          user.imageId = imageId;
          return user.id ? updateUser$(user) : createUser$(user);
        }));
    } else {
      res = user.id ? updateUser$(user) : createUser$(user);
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

    this.file = event.target.files[0];
    reader.onload = (_event) => {
      // this.msg = "";
      this.imgUrl = reader.result;
      // this.form.patchValue({imgUrl: reader.result});
    };
  }

  selectionSkillChange(event: MatSelectChange) {
    this.selectedSkill = event.value;
  }

  addSkill(_skill?: Skill) {
    if (_skill) {
      if (this.availableSkills) {
        this.availableSkills = this.availableSkills.filter(skill => skill.id !== _skill.id);

        this.skills.push(this.fb.group({
          id: [_skill.id],
          description: [_skill.description]
        }));
      }

    } else {
      this.availableSkills = this.availableSkills.filter(skill => skill.id !== this.selectedSkill.id);

      this.skills.push(this.fb.group({
        id: [this.selectedSkill.id],
        description: [this.selectedSkill.description]
      }));
    }

  }

  removeSkill(skillIndex: number) {
    this.availableSkills.push(this.skills.at(skillIndex).value);
    this.skills.removeAt(skillIndex);

  }
}
