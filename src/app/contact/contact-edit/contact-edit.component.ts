import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact$: Observable<Contact | undefined>;

  constructor(
    private contactService: ContactService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
      if (!this.isNew) {
        this.contact$ = contactService.getContactObservable(this.id);
      } else {
        this.contact$ = of({}) as Observable<Contact>;
      }
  }

  ngOnInit() {}

  editContact(contact: Contact) {
    this.contactService.editContact({
      name: contact.name,
      phone: '123-456-7890',
      id: this.id,
    }).then(_ => this.router.navigate(['/contact/all']));
  }

  saveContact(contact: Contact) {
    this.contactService.saveContact({
      name: contact.name,
    }).then(_ => this.router.navigate(['/contact/all']));
  }
  
  deleteContact() {
    this.contactService.deleteContact(this.id)
      .then(_ => this.router.navigate(['/contact/all']));
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
