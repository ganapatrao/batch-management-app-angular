import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiMethodes } from '../constant/Global.constant';
import { batchModel } from '../model/classes/Btach.model';
import { IAPIResponse } from '../model/interfaces/common.interface';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  http = inject(HttpClient);

  createNewBatch(batchObj: batchModel): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(environment.API_URL + '/' + ApiMethodes.BATCH, batchObj);
  }


  Updatebatch(batchObj:batchModel):Observable<IAPIResponse>{
    return this.http.put<IAPIResponse>(`${environment.API_URL}/${ApiMethodes.BATCH}/${batchObj.batchId}`,batchObj)
  }

  getBatches(): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(environment.API_URL + '/' + ApiMethodes.BATCH);
  }


  deleteBatch(id:number):Observable<IAPIResponse>{
    return  this.http.delete<IAPIResponse>(`${environment.API_URL}/${ApiMethodes.BATCH}/${id}`)
  }

  
}
