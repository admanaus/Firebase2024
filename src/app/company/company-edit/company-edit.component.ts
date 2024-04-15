import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company>;

  constructor(private companyService: CompanyService) {
    this.company$ = this.companyService.getCompanyObservable();
  }

  ngOnInit() {}

  editCompany(company: Company) {
    this.companyService.editCompany({phone: '123-456-7890'});
  }

  saveCompany(company: Company) {
    this.companyService.saveCompany(company);
  }
  
  deleteCompany() {
    this.companyService.deleteCompany();
  }

}
