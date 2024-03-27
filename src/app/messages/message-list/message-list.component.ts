import { Component, OnInit } from '@angular/core';
import Message from '../message-model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/contacts/contact.service';
import Contact from 'src/app/contacts/contact.model';


@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit{
  subscription: Subscription;
  contactSubscription: Subscription;
  messages: Message[] = [];
  contacts: Contact[] = [];
  constructor(private messageService: MessageService, private contactService: ContactService){}

  ngOnInit(){
     // this.contactService.getContacts();
     this.subscription = this.messageService.messageListChangedEvent.subscribe(
      (messages: Message[]) => {
      this.messages = messages;
    });
    this.messageService.getMessages();

  }

}
