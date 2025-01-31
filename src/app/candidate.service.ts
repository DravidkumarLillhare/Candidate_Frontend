import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from './candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private baseURL = "http://localhost:8082";

  constructor(private httpClient: HttpClient) { }

  getCandidateList(): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(`${this.baseURL}/candidates`);
  }
  insertCandidate(candidate: Candidate): Observable<Candidate> {
    return this.httpClient.post<Candidate>(`${this.baseURL}/addCandidate`, candidate);
  }


  deleteCandidateById(id: number): Observable<Object> {
    return this.httpClient.delete<Candidate>(`${this.baseURL}/candidate/${id}`);
  }

  getCandidateById(id: number): Observable<Candidate> {
    return this.httpClient.get<Candidate>(`${this.baseURL}/getCandidate/${id}`);
  }

  updateCandidate(id: number, candidate: Candidate): Observable<Candidate> {
    return this.httpClient.put<Candidate>(`${this.baseURL}/updateCandidate/${id}`, candidate);
  }


  uploadResume(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<string>(`${this.baseURL}/resumeUpload/${id}`, formData, { responseType: 'text' as 'json' });
  }
  getResume(candidateId: number) {
    return this.httpClient.get<Blob>(`${this.baseURL}/resumeGet/${candidateId}`, { responseType: 'blob' as 'json' });
  }
  
  deleteResume(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseURL}/resumeDelete/${id}`, { responseType: 'text' as 'json' });
  }

}
