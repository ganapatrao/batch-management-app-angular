import { DatePipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { batchModel } from '../../core/model/classes/Btach.model';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiMethodes } from '../../core/constant/Global.constant';
import { environment } from '../../../environments/environment.development';
import { BatchService } from '../../core/services/batch.service';
import { IAPIResponse } from '../../core/model/interfaces/common.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-batch-master',
  imports: [FormsModule, DatePipe],
  templateUrl: './batch-master.html',
  styleUrl: './batch-master.css',
})
export class BatchMaster implements OnInit {
  http = inject(HttpClient);
  batchService = inject(BatchService);
  snackBar = inject(MatSnackBar);

  batchObj: batchModel = new batchModel();
  batchRecords: batchModel[] = [];
  //https://feestracking.freeprojectapi.com/api/Batche

  ngOnInit(): void {
    this.getBatches();
  }

  Savebatch() {
    if (this.batchObj.batchId == 0) {
      this.batchService.createNewBatch(this.batchObj).subscribe({
        next: (res: IAPIResponse) => {
          this.snackBar.open('Batch created successfully', 'Close', { duration: 1000 });
        this.getBatches();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.message);
        },
      });
    } else {
      //update logic here
      this.batchService.Updatebatch(this.batchObj).subscribe({
        next: (response: IAPIResponse) => {alert("updated successfully")
          this.snackBar.open('Batch updated successfully', 'Close', { duration: 1000 });
          this.getBatches();
        },
      });
    }

    
  }

  getBatches() {
    this.batchService.getBatches().subscribe({
      next: (res: IAPIResponse) => {
        this.batchRecords = res.data;
      },
    });
  }

  deleteBatch(itemId: number) {
    this.batchService.deleteBatch(itemId).subscribe({
      next: (res: IAPIResponse) => {
    //    alert(res.message);
    this.snackBar.open('Batch deleted successfully', 'Close', { duration: 1000 });
        // this.getBatches()
        this.batchRecords = this.batchRecords.filter((result) => result.batchId != itemId);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.error.message);
      },
    });
  }

  EditBatch(editData: batchModel) {
    console.log(editData);
    // Make a shallow copy so we don't mutate the table item directly
    this.batchObj = { ...editData } as batchModel;

    // Convert dates into YYYY-MM-DD which <input type="date"> expects
    this.batchObj.startDate = this.formatDateForInput(editData.startDate);
    this.batchObj.endDate = this.formatDateForInput(editData.endDate);

    this.Savebatch();
  }

  private formatDateForInput(value: string | Date): string {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
