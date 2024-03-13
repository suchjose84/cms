import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import Contact from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy{
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) {}
  
  ngOnInit(){
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;

    });

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  search(value: string) {
    this.term = value;
  }

}
