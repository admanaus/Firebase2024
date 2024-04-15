import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyRef: AngularFirestoreDocument<Company>;

  constructor(private db: AngularFirestore) {
    this.companyRef = this.db.doc<Company>('companies/company');
  }

  getCompanyObservable(): Observable<Company | any> {
    return this.companyRef.valueChanges();
  }

  editCompany(company: any) {
    this.companyRef.update(company);
  }

  saveCompany(company: Company) {
    this.companyRef.set(company);
  }

}

