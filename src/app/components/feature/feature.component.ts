import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Feature } from '../../Model/Feature';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent {
  dialog: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FeatureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feature,
    private formBuilder: FormBuilder
  ) {
    this.dialog = this.formBuilder.group({
      name: ['123', Validators.required],
      type: ['text'],
      content: [null]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
