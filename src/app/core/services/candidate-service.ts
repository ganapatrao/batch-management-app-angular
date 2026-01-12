import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiMethods, GlobalConstants } from '../constant/Global.constant';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../model/interfaces/common.interface';
import { candidateModel } from '../model/classes/candidate.model';
import { Icandidate } from '../model/interfaces/candidate.interface';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  http = inject(HttpClient);

  getAllCandidate(): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.API_URL}/${ApiMethods.CANDIDATE}`);
  }

  createCandidate(candidate: candidateModel): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(
      `${environment.API_URL}/${ApiMethods.CANDIDATE}`,
      candidate
    );
  }

  updateCandidate(candidate: Icandidate): Observable<IAPIResponse> {
    console.log('update candidate service', candidate);
    return this.http.put<IAPIResponse>(
      `${environment.API_URL}/${ApiMethods.CANDIDATE}/${candidate.candidateId}`,
      candidate
    );
    //return this.http.put<IAPIResponse>(`${environment.API_URL}/${ApiMethods.CANDIDATE}/${candidate.candidateId}`,candidate)
  }

  deleteCandidate(candidateId: number): Observable<IAPIResponse> {
    return this.http.delete<IAPIResponse>(
      `${environment.API_URL}/${ApiMethods.CANDIDATE}/${candidateId}`
    );
  }
}
