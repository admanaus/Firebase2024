import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company | undefined>;

  constructor(
    private companyService: CompanyService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
      if (!this.isNew) {
        this.company$ = companyService.getCompanyObservable(this.id);
      } else {
        this.company$ = of({}) as Observable<Company>;
      }
  }

  ngOnInit() {}

  editCompany(company: Company) {
    this.companyService.editCompany({
      name: company.name,
      phone: '123-456-7890',
      id: this.id,
    }).then(_ => this.router.navigate(['/company/all']));
  }

  saveCompany(company: Company) {
    this.companyService.saveCompany({
      name: company.name,
    }).then(_ => this.router.navigate(['/company/all']));
  }
  
  deleteCompany() {
    this.companyService.deleteCompany(this.id)
      .then(_ => this.router.navigate(['/company/all']));
  }

  getRandomId(): string {
    return Math.random().toString(36).substring(2);
  }

  get id(): string {
    if (!this.activatedRoute.snapshot.paramMap.has('id')) {
      return 'new';
    }

    return this.activatedRoute.snapshot.paramMap.get('id');
    
  }

  get isNew(): boolean {
    return this.id === 'new';
  }

}
