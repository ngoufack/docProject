import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DocModel} from "../model/doc.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly apiUrl: string = "http://localhost:8080/api/ocr";

  constructor(private http: HttpClient) { }

   addDoc(doc: DocModel):Observable<any> {
    return  this.http.post<any>(this.apiUrl, doc);
  }
}
