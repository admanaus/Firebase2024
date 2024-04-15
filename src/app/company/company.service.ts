import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable, catchError, from, of } from 'rxjs';
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

  saveCompany(company: Company) {
    // this.companyRef.set(company)
    //   .then(_ => console.log('Success on set'))
    //   .catch(error => console.log('set', error));
    from(this.companyRef.set(company))
      .pipe(
        catchError(error => {
          console.log('set', error);
          return of('Error');
        })
      );
  }

  editCompany(company: any) {
    this.companyRef.update(company)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteCompany() {
    this.companyRef.delete()
      .then(_ => console.log('Success on remove'))
      .catch(error => console.log('remove', error));
  }

}

