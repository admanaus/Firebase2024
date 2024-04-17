import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { EMPTY, Observable } from 'rxjs';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts$: Observable<Contact[]>;

  constructor(private contactService: ContactService) {
    this.contacts$ = EMPTY;
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.contactService.getContactsObservable();
  }

}
