import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../services';
import { Expense, DailogData, User, Tax } from '../models';
import { TaxService } from '../services/tax.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  currentUser: User;
  tax: Tax;
  dialogForm: FormGroup;
  loading: boolean = false;
  localAction:string;
  localData:Expense;
 
  constructor(
    private authenticationService: AuthenticationService,
    private taxService: TaxService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DailogData) {
      this.currentUser = this.authenticationService.currentUserValue;
      this.tax = this.taxService.currentTaxValue;
      this.localAction = data.action;
      this.localData = data.expense || {} as Expense;
  }

  ngOnInit(): void {
        this.dialogForm = this.formBuilder.group({
          description: [this.localData.description, Validators.required],
          value: [this.localData.value, [Validators.required, Validators.min(1)]],
          dateOfExpense: [this.localData.dateOfExpense, Validators.required],
          VATValue: this.localData.VAT
        });
        this.updateVATValue();
  }

  // convenience getter for easy access to form fields
  get f() { return this.dialogForm.controls; }

  onSubmit() {
    if (this.dialogForm.invalid) {
        return;
    }

    this.loading = true;
    
    let expense = {
      userId: this.currentUser.id,
      id: this.localData.id,
      description: this.f.description.value,
      value: this.f.value.value,
      dateOfExpense: this.f.dateOfExpense.value,
      taxId: this.tax.id,
      VAT: this.f.VATValue.value
    } as Expense;
    
    this.dialogRef.close({event: this.localAction, data: expense});
  }
 
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
    return false;
  }

  updateVATValue() {
    this.f.VATValue.setValue(Expense.getAmountVATValue(this.f.value.value, this.tax.rate));
  }
}