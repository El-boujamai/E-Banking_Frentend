import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer';

@Component({
  selector: 'app-new-operation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-operation.html',
  styleUrl: './new-operation.css',
})
export class NewOperation {
  @Input() accountId!: string;
  protected newOperationGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customersService: CustomerService,
  ) {
    this.newOperationGroup = this.fb.group({
      type: this.fb.control(null),
      amount: this.fb.control(null),
      description: this.fb.control(null),
    });
  }
  protected handleSaveOperation() {
    if (this.newOperationGroup.invalid) return;

    const operation = {
      ...this.newOperationGroup.value,
      amount: Number(this.newOperationGroup.value.amount),
      accountId: this.accountId,
    };

    console.log(operation);

    this.customersService.saveOperation(operation).subscribe({
      next: () => {
        alert('Operation saved successfully');
        this.newOperationGroup.reset();
      },
      error: (err) => console.log(err),
    });
  }
}
