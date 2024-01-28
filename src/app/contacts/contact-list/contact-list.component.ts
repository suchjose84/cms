import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import Contact from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{

  @Input() contacts: Contact[] = [];
  @Output() selectedContactEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  
  ngOnInit(){
    this.contacts = [
      {
        id: "1",
        name: "R Kent Jackson",
        email: "jacksonk@byui.edu",
        phone: "208-496-3771",
        imageUrl: "/assets/images/jacksonk.jpg",
        group: null
      },
      {
        id: "2",
        name: "Rex Barzee",
        email: "barzeer@byui.edu",
        phone: "208-496-3768",
        imageUrl: "../../assets/images/barzeer.jpg",
        group: null
      }
    ]
  }
  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
  

}
