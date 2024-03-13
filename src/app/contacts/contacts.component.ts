import { Component, OnInit } from '@angular/core';
import Contact from './contact.model';
import { ContactService } from './contact.service';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
  selectedContact: Contact;
  constructor(private contactService: ContactService, private messageService: MessageService){}

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    })
    this.contactService.getContacts();
    
  }

  handleSelectedContact(contact: Contact) {
    this.selectedContact;
  }

}
