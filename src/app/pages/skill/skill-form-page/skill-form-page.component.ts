import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Skill } from '../../../models/skill';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-skill-form-page',
  templateUrl: './skill-form-page.component.html',
  styleUrls: ['./skill-form-page.component.css']
})
export class SkillFormPageComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private skillService: SkillService,
              private dialogRef: MatDialogRef<SkillFormPageComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    const form = this.fb.group({
      id: [],
      name: [],
      description: []
    });

    if (data) {
      form.reset(data);
    }

    this.form = form;
  }

  async submit() {
    let skill = this.form.value as Skill;
    const createSkill$ = (skill) => this.skillService.createSkill(skill);
    const updateSkill$ = (skill) => this.skillService.updateSkill(skill.id, skill);
    const res$ = skill.id ? updateSkill$(skill) : createSkill$(skill);

    res$.subscribe(() => this.dialogRef.close());
  }

  close() {
    this.dialogRef.close();
  }

}
