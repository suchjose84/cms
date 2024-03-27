import { Component, ElementRef, ViewChild } from '@angular/core';
import Message from '../message-model';
import { MessageService } from '../message.service';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject', {static: false}) subjectInput: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextInput: ElementRef;

  currentSender: string = "101";
  constructor(private messageService: MessageService, private contactService: ContactService){}

  onSendMessage(){
    const subjectValue: string = this.subjectInput.nativeElement.value;
    const msgTextValue: string = this.msgTextInput.nativeElement.value;

    const newMessage: Message = {
      id: "101", // Hardcoded ID (replace with logic to generate unique IDs)
      subject: subjectValue,
      msgText: msgTextValue,
      sender: this.currentSender,
    }
    // console.log("newMessage");
    // this.contactService.getContacts();
    this.messageService.addMessage(newMessage);

  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }

}
