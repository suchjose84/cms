import { EventEmitter, Injectable } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import Contact from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;

  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    const contact = this.contacts.find(c => c.id === id);
    return contact ? { ...contact } : null; //returns the contact object using the spread operator if it's truthy

  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
  
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index === -1) {
      return;
    }
  
    this.contacts.splice(index, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
  



}
