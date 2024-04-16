import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable, catchError, from, map, of } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyRef: AngularFirestoreDocument<Company>;
  private companiesRef: AngularFirestoreCollection<Company>;

  constructor(private db: AngularFirestore) {
    this.companyRef = this.db.doc<Company>('companies/company');
    this.companiesRef = this.db.collection<Company>('companies');
  }

  getCompaniesObservable(): Observable<Company[]> {
    return this.companiesRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Company>[]): Company[] => {
          return items.map((item: DocumentChangeAction<Company>): Company => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        })
      );
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

