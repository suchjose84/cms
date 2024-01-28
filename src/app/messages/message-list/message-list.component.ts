import { Component } from '@angular/core';
import Message from '../message-model';


@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    { id: '1', sender: 'Bro. Jackson', subject: 'Grades have been posted', msgTxt: 'The grades for this assignment have been posted' },
    { id: '2', sender: 'Steve Johnson', subject: 'Assignment Due Date', msgTxt: 'When is the assignment 3 due?' },
    { id: '3', sender: 'Bro. Jackson', subject: 'Assignment Due Date', msgTxt: 'Assignment 3 is due on Saturday at 11:30 PM' },
    { id: '4', sender: 'Mark Smith', subject: 'Can we meet?', msgTxt: 'Can I meet you sometime, I need help with assignment 3' },
    { id: '5', sender: 'Bro. Jackson', subject: 'Can we meet?', msgTxt: 'I can meet you today at 4:00 PM in my office.' },

  ];

  onAddMessage(message: Message) {
    this.messages.push(message);

  }

}
