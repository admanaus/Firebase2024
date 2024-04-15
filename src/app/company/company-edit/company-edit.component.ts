import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company | undefined>;

  constructor(private db: AngularFirestore) {
    this.company$ = this.db.doc<Company>('companies/company').valueChanges();
  }

  ngOnInit() {}

}