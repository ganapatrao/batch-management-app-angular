import { Component, inject, OnInit, signal } from '@angular/core';
import { candidateModel } from '../../core/model/classes/candidate.model';
import { CandidateService } from '../../core/services/candidate-service';
import { IAPIResponse } from '../../core/model/interfaces/common.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './candidate.html',
  styleUrl: './candidate.css',
})
export class Candidate implements OnInit {
  viewMode = signal<'table' | 'card'>('table');
  showPassword = signal<boolean>(false);
  candidateForm: FormGroup = new FormGroup({});

  candidateService = inject(CandidateService);
  snackBar = inject(MatSnackBar);

  candidateRecords: candidateModel[] = [];

  // candidatObj: candidateModel = new candidateModel();

  constructor() {
    this.initializeForm();
  }
  initializeForm() {
    this.candidateForm = new FormGroup({
      candidateId: new FormControl<number | null>(0),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobileNumber: new FormControl(''),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      isActive: new FormControl(true),
      //i have not added created at updatedat fields in form as they will be handeled in backend
      //createdAT: new FormControl(new Date()), this way it works
      //
    });
  }
  ngOnInit(): void {
    this.getCandidates();
  }

  togglePassword() {
    this.showPassword.update((value) => !value);
  }

  getCandidates() {
    this.candidateService.getAllCandidate().subscribe({
      next: (result: IAPIResponse) => {
        this.candidateRecords = result.data;
      },
    });
  }

  addCandidate() {}

  setTableView() {
    this.viewMode.set('table');
  }

  setCardView() {
    this.viewMode.set('card');
  }

  editCandidate(candidate: candidateModel) {
    // open the create/edit panel and populate form (UI wiring to be implemented)
    this.viewMode.set('table');
    console.log('Edit candidate', candidate);
    this.candidateForm.patchValue(candidate);
    // this.candidatObj = { ...candidate };
  }

  deleteCandidate(id: number) {
    // this.candidateRecords = this.candidateRecords.filter(c => c.id !== id);
    this.candidateService.deleteCandidate(id).subscribe({
      next: (res: IAPIResponse) => {
        this.snackBar.open('Candidate updated successfully', 'Close', { duration: 1000 });
        this.getCandidates();
      },
    });
  }

  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this candidate?')) {
      this.deleteCandidate(id);
    }
  }

  saveCandidate() {
    if (this.candidateForm.valid) {
      if (this.IsEditMode) {
        this.candidateService.updateCandidate(this.candidateForm.value).subscribe({
          next: (res: IAPIResponse) => {
            if (res.result) {
              this.snackBar.open('Candidate updated successfully', 'Close', { duration: 1000 });
              this.candidateForm.reset();
              this.getCandidates();
            } else {
              alert(res.message);
            }
          },
        });
      } else {
        this.candidateService.createCandidate(this.candidateForm.value).subscribe({
          next: (res: IAPIResponse) => {
            this.snackBar.open('Candidate created successfully', 'Close', { duration: 1000 });
            this.candidateForm.reset(); //or you can set to new FormGroup({}) or initializeForm();
            this.getCandidates();
            // #gtx-query  //this is not working properly
            //   this.candidateRecords = [...this.candidateRecords, res.data];
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
          },
        });
      }

      //   this.candidatObj = this.candidateForm.value;
    }
  }

  get IsEditMode(): boolean {
    return !!this.candidateForm.value.candidateId;
  }
}