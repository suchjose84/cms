import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import Message from '../message-model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject', {static: false}) subjectInput: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextInput: ElementRef;
  @Output() addMessageEvent: EventEmitter<Message> = new EventEmitter<Message>();

  currentSender: string = "Jose Such";

  onSendMessage(){
    const subjectValue: string = this.subjectInput.nativeElement.value;
    const msgTextValue: string = this.msgTextInput.nativeElement.value;

    const newMessage: Message = {
      id: "1", // Hardcoded ID (replace with logic to generate unique IDs)
      sender: this.currentSender,
      subject: subjectValue,
      msgTxt: msgTextValue
    }
    this.addMessageEvent.emit(newMessage);

  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }

}
